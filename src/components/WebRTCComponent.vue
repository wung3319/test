<template>
    <div>
        <video id="localVideo" autoplay muted></video>
        <video id="remoteVideo" autoplay></video>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    name: 'WebRTCComponent',
    data() {
        return {
            isChannelReady: false,
            isInitiator: false,
            isStarted: false,
            localStream: null,
            pc: null,
            remoteStream: null,
            turnReady: null,
            pcConfig: {
                iceServers: [
                    { urls: "stun:stun1.l.google.com:19302" },
                ],
            },
            room: 'foo',
            socket: null,
        };
    },
    mounted() {
        this.socket = io.connect(window.location.origin);

        if (this.room !== '') {
            this.socket.emit('create or join', this.room);
            console.log(`Attempt to create or join room: ${this.room}`);
        }

        this.socket.on('created', (room) => {
            console.log(`Room created: ${room}`);
            this.isInitiator = true;
        });

        this.socket.on('join', (room) => {
            console.log(`Another peer has joined the room: ${room}`);
            this.isChannelReady = true;
        });

        this.socket.on('joined', (room) => {
            console.log(`joined : + ${room}`);
            this.isChannelReady = true;
        });

        this.socket.on('message', (message) => {
            console.log(`Received message: ${message}`);
            if (message === 'got user media') {
                this.maybeStart();
            } else if (message.type === 'offer') {
                if (!this.isInitiator && !this.isStarted) {
                    this.maybeStart();
                }
                this.pc.setRemoteDescription(new RTCSessionDescription(message));
                this.doAnswer();
            } else if (message.type === 'answer' && this.isStarted) {
                this.pc.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate' && this.isStarted) {
                var candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate
                });
                this.pc.addIceCandidate(candidate);
            } else if (message === 'bye' && this.isStarted) {
                this.handleRemoteHangup();
            }
        });

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        }).then(stream => {
            this.gotStream(stream);
        }).catch(e => {
            alert(`getUserMedia() error: ${e.name}`);
        });
    },
    methods: {
        gotStream(stream) {
            console.log('Local stream added.');
            this.localStream = stream;
            var localVideo = document.getElementById('localVideo');
            localVideo.srcObject = stream;
            this.sendMessage('got user media');
            if (this.isInitiator) {
                this.maybeStart();
            }
        },
        sendMessage(message) {
            console.log(`Sending message from client: ${message}`);
            this.socket.emit('message', message);
        },
        maybeStart() {
            console.log(`maybeStart() check - Started: ${this.isStarted}, Local stream: ${!!this.localStream}, Channel ready: ${this.isChannelReady}`);
            if (!this.isStarted && this.localStream && this.isChannelReady) {
                this.createPeerConnection();
                this.pc.addStream(this.localStream);
                this.isStarted = true;
                if (this.isInitiator) {
                    this.doCall();
                }
            }
        },
        createPeerConnection() {
            try {
                this.pc = new RTCPeerConnection(this.pcConfig);
                this.pc.onicecandidate = this.handleIceCandidate;
                this.pc.ontrack = this.handleRemoteStreamAdded;
                this.localStream.getTracks().forEach(track => {
                    this.pc.addTrack(track, this.localStream);
                });
                console.log('PeerConnection created');
            } catch (e) {
                console.error(`Failed to create PeerConnection, exception: ${e.message}`);
                alert('Cannot create RTCPeerConnection object.');
                return;
            }
        },
        doCall() {
            console.log('Sending offer to peer.');
            this.pc.createOffer().then(
                sessionDescription => this.setLocalAndSendMessage(sessionDescription),
                error => console.error(`Failed to create session description: ${error}`)
            );
        },
        doAnswer() {
            console.log('Sending answer to peer.');
            this.pc.createAnswer().then(
                sessionDescription => this.setLocalAndSendMessage(sessionDescription),
                error => console.error(`Failed to create session description: ${error}`)
            );
        },
        setLocalAndSendMessage(sessionDescription) {
            this.pc.setLocalDescription(sessionDescription);
            console.log('Set local and send message', sessionDescription);
            this.sendMessage(sessionDescription);
        },
        handleIceCandidate(event) {
            if (event.candidate) {
                this.sendMessage({
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                });
            } else {
                console.log('End of candidates.');
            }
        },
        handleRemoteStreamAdded(event) {
            console.log('Remote stream added.');
            this.remoteStream = event.streams[0];
            var remoteVideo = document.getElementById('remoteVideo');
            remoteVideo.srcObject = this.remoteStream;
        },
        handleRemoteHangup() {
            console.log('Session terminated.');
            this.stop();
            this.isInitiator = false;
        },
        stop() {
            if (this.isStarted) {
                this.isStarted = false;
                this.pc.close();
                this.pc = null;
            }
        }
    }
};
</script>
