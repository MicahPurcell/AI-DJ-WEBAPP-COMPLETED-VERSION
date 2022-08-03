song = ""
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
score_leftWrist = 0
score_rightWrist = 0


function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
     poseNet.on('pose', gotPoses)
}

function modelLoaded(){
    console.log('PoseNet has started.')
}

function gotPoses(results){
    if (results.length > 0) {
        
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("score_leftWrist = " + score_leftWrist)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY)

        score_rightWrist = results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#34ebd2")
    stroke("#34ebd2")

    if (score_leftWrist > 0.2) 
{  circle(leftWristX,leftWristY,20);
    number = Number(leftWristY);
    removeDecimals = floor(number)
    volume = removeDecimals/500;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume``)
        
    }

if (score_rightWrist > 0.2) 
{
    circle(rightWristx, rightWristY, 20);
    
    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById('speed').innerHTML = "Speed = 0.5x"
        song.rate(0.5) 
    }

    if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById('speed').innerHTML = "Speed = 1x"
        song.rate(1) 
    }

    if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById('speed').innerHTML = "Speed = 1.5x"
        song.rate(1.5) 
    }

    if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById('speed').innerHTML = "Speed = 2x"
        song.rate(2) 
    }

    if (rightWristY > 400 && rightWristY <= 500) {
        document.getElementById('speed').innerHTML = "Speed = 2.5x"
        song.rate(2.5) 
    }
    
}
}

function preload(){
    song = loadSound("music.mp3")
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}