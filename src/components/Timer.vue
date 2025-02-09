<script setup>
    import { ref } from 'vue'
    import alarmSoundFile from '@/assets/alarm-sound.mp3'  
</script>
<template>
    <div class="container">
        <div class="timer"
            v-if="running"
        >{{ time }}</div>
        <label for="time" class="sr-only">Set Time:</label>
        <input type="time"
            v-if="!running"
            class="timeInput"
            step="1"
            v-model="time"
            value="00:00:00"
            @change="setTime"
            ></input>
        <div class="buttons">
            <div class="StartPause">
                <button
                    v-if="!running || paused"
                    :disabled="time == '00:00:00'"
                    class="icon-button"
                    aria-label="Start"
                    @click="startTimer"
                >
                    <img src="@/assets/play.png" alt="Start" class="icon"/>
                    <span class="tooltip">Start</span>
                </button>
                <button
                    v-if="running && !paused &&  time != '00:00:00'"
                    class="icon-button"
                    aria-label="Pause"
                    @click="pauseTimer"
                >
                    <img src="@/assets/pause.png" alt="Pause" class="icon"/>
                    <span class="tooltip">Pause</span>
                </button>
                <button
                    v-if="time == '00:00:00' && running"
                    class="icon-button"
                    aria-label="Set Time"
                    @click="setupTimer"
                >
                    <img src="@/assets/stopwatch2.png" alt="Set Time" class="icon"/>
                    <span class="tooltip">Set Time</span>
                </button>
            </div>
            <div class="Reset">
            <button
                :disabled="time == '00:00:00'"
                class="icon-button"
                aria-label="Reset"
                @click="resetTimer"
            >
                <img src="@/assets/reset.png" alt="Reset" class="icon"/>
                <span class="tooltip">Reset</span>
            </button>
            </div>
        </div>
    </div>
</template>
<script>
    const alarmSound = new Audio(alarmSoundFile)
    let time = ref('00:00:00')
    let latest = '00:00:00'
    let running = ref(false)
    let paused = ref(false)
    let timerInterval = null
    
    function setTime(event) {
        time.value = event.target.value
        latest = time.value
        console.log('Time set to:', time.value)
    }

    function setupTimer() {
        clearInterval(timerInterval)
        timerInterval = null
        running.value = false
        paused.value = false
        if (latest != '00:00:00') {
            time.value = latest
            return
        }
        time.value = '00:00:00'
    }

    function resetTimer() {
        clearInterval(timerInterval)
        timerInterval = null
        running.value = false
        paused.value = false
        time.value = '00:00:00'  
    }

    function pauseTimer() {
        paused.value = true
        running.value = true
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function soundAlarm() {
        alarmSound.play()
        .then(() => {
            document.querySelector('.timer').classList.add('alarmed')
            setTimeout(() => {
                document.querySelector('.timer').classList.remove('alarmed')
            }, 5000)
        })
        .catch((error) => {
            console.error('Error playing alarm sound:', error)
        })
    }

    function startTimer() {
        if (timerInterval) return

        let [hours, minutes, seconds] = time.value.split(':').map(Number)
        let totalSeconds = hours * 3600 + minutes * 60 + seconds
        paused.value = false
        running.value = true

        timerInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval)
                timerInterval = null
                time.value = '00:00:00'
                soundAlarm()
                return
            }

            totalSeconds--;
            hours = Math.floor(totalSeconds / 3600)
            minutes = Math.floor((totalSeconds % 3600) / 60)
            seconds = totalSeconds % 60

            time.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        }, 1000)
    }
</script>
<style scoped>
.container {
    font-size: 10vh;
    width: 100%;
    max-width: 800px;
}

.buttons {
    font-size: 2vh;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.icon-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-button .icon {
    width: 24px;
    height: 24px;
    display: block;
    filter: brightness(0) invert(1);
}

.icon-button .tooltip {
    visibility: hidden;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    pointer-events: none;
    margin-bottom: 5px;
}

.icon-button:hover .tooltip {
    visibility: visible;
}

.StartPause, .Reset {
    display: flex;
    flex: 1;
    margin: 0;
}

.buttons button {
    background: none;
    border: 1px solid rgb(122, 122, 122);
    color: white;
    width: 100%;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
}

.buttons button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.buttons button:disabled {
    border-color: rgba(122, 122, 122, 0.3);
    cursor: not-allowed;
}

.buttons button:disabled .icon {
    opacity: 0.3;
}

.buttons button:disabled:hover {
    background-color: transparent;
}

.buttons button:disabled .tooltip {
    visibility: hidden;
}

.timer, .timeInput {
    width: 100%;
    height: 1.5em;
    padding: 0.5em;
    border: 1px solid white;
    border-radius: 10px;
    margin: 3px;
    font-size: clamp(16px, 8vw, 80px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.timeInput {
    color: white;
    background-color: rgba(0, 0, 0, 0.2);
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

  @keyframes alarmAnimation {
    0%   { border-width: 1px; border-color: red; }
    100% { border-width: 1px; border-color: white; }
}

.alarmed {
    animation-name: alarmAnimation;
    animation-duration: 1s;
    animation-iteration-count: 5;
}
</style>