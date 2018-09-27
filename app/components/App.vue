<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Welcome to NativeScript-Vue!"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>

                <Label class="drawer-item" text="Item 1"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Item 3"/>
            </StackLayout>

            <GridLayout ~mainContent colums="*" rows="*">
                <Label class="message" :text="msg" col="0" row="0"/>
                <Gradient direction="to right" colors="#FF0077, red, #FF00FF">
                  <Label text="Best gradient." horizontalAlignment="center"
                         style="color: white; padding: 20" />

                  <StackLayout> 
                      <Button text="Start" @tap="start" />
                      <Button text="Stop" @tap="stop" />
                      <Button text="Play" @tap="play" />
                  </StackLayout>

                </Gradient>        
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import { 
  SpeechRecognition,
  SpeechRecognitionOptions,
  SpeechRecognitionTranscription
} from 'nativescript-speech-recognition'
import { TNSPlayer } from 'nativescript-audio'


const speechRec = new SpeechRecognition()
const player = new TNSPlayer()

const playerOptions = {
  // audioFile: 'http://chambitedu.vipweb.kr/contents_data/MP3/FUT/393_15_1.mp3',
  audioFile: '~/audios/em-100-1.mp3',
  loop: false,
  completeCallback: function() {
    console.log('finished playing');
    player.dispose()
  },
  errorCallback: function(errorObject) {
    console.log(JSON.stringify(errorObject));
  },
  infoCallback: function(args) {
    console.log(JSON.stringify(args));
  }
};

export default {
  data() {
    return {
      msg: 'Hello World!2 Hello NativeScript!'
    }
  },
  created: function() {
      console.log('app created!!')
  },
  mounted: () => {

  },
  methods: {
    start: function() { 
      console.log("kkkk")
      speechRec.available().then((result) => {
        if (!result) {
          alert('no recognition');
          return;
        }
        speechRec.startListening({
          returnPartialResults: true,
          locale: "en-US",
          onResult: (transcript) => {
            console.log('partial:', transcript.text);
            if (transcript.finished) {
              alert(transcript.text);
              console.log('final:', transcript.text);
            }
          }
        })
      })
    },
    stop: () => {
      speechRec.stopListening()
    },
    play: () => {
      player
      .playFromFile(playerOptions)
      .then(function(res) {
        console.log('res:', res);
      })
      .catch(function(err) {
        console.log('something went wrong...', err);
      });
    }
  }
}
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #53ba82;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
