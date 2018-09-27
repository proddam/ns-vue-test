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
                  <Label :text="eng" horizontalAlignment="center" style="color: white; padding: 20" />
                  <Label :text="kor" horizontalAlignment="center" style="color: black; padding: 20" />

                  <StackLayout> 
                      <!-- <Button text="Start" @tap="start" /> -->
                      <Button text="Stop" @tap="stop" />
                      <Button text="Play" @tap="play" />
                  </StackLayout>

                  <Label :text="utterance" horizontalAlignment="center" style="color: white; padding: 20" />
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


let mp3Idx = 0
const dataDay100 = [
  { 
    eng: "Let's go ahead with this plan. We can manage.",
    kor: "이 계획 실행하자. 우린 할 수 있어."
  },
  {
    eng: "With your track record, I don't think we can pull it off.",
    kor: "너의 전적을 볼때 우리 해내지 못할 거 같아."
  },
  {
    eng: "Come on! Don't be such a chicken.",
    kor: "왜이래. 그렇게 겁쟁이 처럼 굴지마."
  },
  {
    eng: "All I'm saying is we need something to turn to.",
    kor: "내 말은 의지할 뭔가가 필요하단 거야."
  },
  {
    eng: "OK. If you insist, let's meet halfway.",
    kor: "알았어. 정 그렇다면 절반씩 타협하자."
  },
  {
    eng: "Be serious. It's no laughing matter.",
    kor: "좀 진지해져봐. 웃을 일이 아니야."
  }
]

export default {
  data() {
    return {
      msg: 'Hello World!2 Hello NativeScript!',
      eng: 'eng',
      kor: '한글',
      utterance: ''
    }
  },
  created() {
    console.log('app created!!')
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.play()
    },
    playMp3(day, ith) {
      let self = this
      const playerOptions = {
        audioFile: 'http://engwiz.com/audios/demo/sunit/em-100-1.mp3',
        loop: false,
        completeCallback() {
          console.log('finished playing')
          player.dispose()
          self.start()
        },
        errorCallback: function(errorObject) {
          console.log(JSON.stringify(errorObject));
        },
        infoCallback: function(args) {
          console.log(JSON.stringify(args));
        }
      }
      playerOptions.audioFile = `http://engwiz.com/audios/demo/sunit/em-${day}-${ith}.mp3`
      player.playFromFile(playerOptions)
      .then(function(res) {
        console.log('res:', res)
      })
      .catch(function(err) {
        console.log('something went wrong...', err)
      })
    },    
    start() {
      let self = this 
      console.log("kkkk")
      speechRec.available().then((result) => {
        if (!result) {
          alert('no recognition');
          return;
        }
        speechRec.startListening({
          returnPartialResults: true,
          locale: "en-US",
          onResult(transcript) {
            self.utterance = transcript.text
            if (transcript.finished) {
              console.log('final:', transcript.text)
              if (mp3Idx>0) setTimeout( self.play, 1500 )
            } else {
              console.log('partial:', transcript.text)
            }

          }
        })
      })
    },
    stop() {
      speechRec.stopListening()
    },
    play() {
      this.eng = `${mp3Idx+1} ${dataDay100[mp3Idx].eng}`
      this.kor = dataDay100[mp3Idx].kor
      this.utterance = '[Speak....]'
      this.playMp3(100, mp3Idx + 1)
      mp3Idx = (++mp3Idx)%6
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
