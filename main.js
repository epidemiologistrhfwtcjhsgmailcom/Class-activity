song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
score_left_wrist = 0;
score_right_wrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log("Posenet is Initialized");
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#ff0400");
    stroke("#ff0400");
    
    if(score_left_wrist > 0.2) {
    circle(leftWristx,leftWristy,20);
    InNumberLeftWrist = Number(leftWristy);
    remove_decimal = floor(InNumberLeftWrist);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = "+ volume;
    song.setVolume(volume);
    }

    if(score_right_wrist > 0.2) {
        circle(rightWristx,rightWristy,20);

        if(rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristy > 100 && rightWristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristy > 200 && rightWristy <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristy > 300 && rightWristy <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristy > 400 && rightWristy <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log("Score_Left_Wrist = "+ score_left_wrist);
        score_right_wrist = results[0].pose.keypoints[10].score;
        console.log("Score_Right_Wrist = "+ score_right_wrist);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("LeftWristx = "+ leftWristx +"LeftWristy = "+ leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWristy.y;
        console.log("RightWristx = "+ rightWristx +"RightWristy = "+ rightWristy);
    }
}