var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

var txt_listener = new ROSLIB.Topic({
    ros: ros,
    name: '/txt_msg',
    messageType: 'std_msgs/String'
});

var cmd_vel_listener = new ROSLIB.Topic({
    ros: ros,
    name: "/cmd_body",
    messageType: 'geometry_msgs/Twist'
});

var txt_listener2 = new ROSLIB.Topic({
    ros: ros,
    name: '/txt_msg',
    messageType: 'std_msgs/String'
});
var number_obs = new ROSLIB.Topic({
    ros: ros,
    name: '/num_obs',
    messageType: 'std_msgs/Int16'
});

var type_obs = new ROSLIB.Topic({
    ros: ros,
    name: '/type_obs',
    messageType: 'std_msgs/Int16MultiArray'
});


var cmd_vel_listener2 = new ROSLIB.Topic({
    ros: ros,
    name: "/cmd_base",
    messageType: 'geometry_msgs/Twist'
});

txt_listener2.subscribe(function (k) {
    document.getElementById("msg2").innerHTML = k.data;

});
number_obs.subscribe(function (k) {
    document.getElementById("num_objects").innerHTML = k.data;

});
type_obs.subscribe(function (k) {

    if (k.data.includes(1)) {
        document.getElementById("type_objectsGC").innerHTML = "G - C";
        document.getElementsByClassName("gc").style.background="	#008000";
    }
    else {
        document.getElementById("type_objectsGC").innerHTML = [];
    }

    if (k.data.includes(0)) {
        document.getElementById("type_objectsRC").innerHTML = "R - C";

    }
    else {
        document.getElementById("type_objectsRC").innerHTML = [];
    }


    if (k.data.includes(3)) {
        document.getElementById("type_objectsRR").innerHTML = "R - R";

    }
    else {
        document.getElementById("type_objectsRR").innerHTML = [];
    }

    if (k.data.includes(2)) {
        document.getElementById("type_objectsGR").innerHTML = "G - R";
        document.getElementsByClassName("gr").style.background="	#008000";


    }
    else {

        document.getElementById("type_objectsGR").innerHTML = [];

    }

});
var button = new ROSLIB.Topic({
    ros:ros,
    name: "/button",
    messageType: "std_msgs/Int16"
});
var zero = new ROSLIB.Message({data:0});//turn off
var one = new ROSLIB.Message({data:1});//turn on
var two = new ROSLIB.Message({data:2});//rec shp.
var three = new ROSLIB.Message({data:3});//cir shp.
var four = new ROSLIB.Message({data:4});//red
var five = new ROSLIB.Message({data:5});//green
var six = new ROSLIB.Message({data:6});//box1
var seven = new ROSLIB.Message({data:7});//box2
var eight = new ROSLIB.Message({data:8});//box3

ros.on('connection', function () {
    document.getElementById("status").innerHTML = "Connected";

});

ros.on('error', function (error) {
    document.getElementById("status").innerHTML = "Error";

    
});

ros.on('close', function () {
    document.getElementById("status").innerHTML = "Disconnrct";

});

createViewer2 = function () {
    var viewer = new MJPEGCANVAS.Viewer({
        divID: 'mjpeg2',
        host: 'localhost',
        width: 450,
        height: 240,
        topic: 'image_topic'
    });
}
window.onload = function () {
    

    createViewer2();
    
    var viewer = new ROS3D.Viewer({
        divID: 'urdf',
        width: 600,
        height: 530,
        background: '#0574AF',
        antialias: true
    });

    // Add a grid.
    viewer.addObject(new ROS3D.Grid());

    // Setup a client to listen to TFs.
    var tfClient = new ROSLIB.TFClient({
        ros: ros,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0
    });

    // Setup the URDF client.
    var urdfClient = new ROS3D.UrdfClient({
        ros: ros,
        tfClient: tfClient,
        path: 'https://raw.githubusercontent.com/maxauto/urdf_robot_arm/main/max/',
        rootObject: viewer.scene,
        loader: ROS3D.COLLADA_LOADER_2
    });



}
//button
var toggle = false;
function power(v) {
    if (toggle == true) {
        document.getElementById("onoff").innerHTML = "Off";
        document.getElementById("togglebutton").className = "btn btn-outline-success mt-1 ms-2 mb-1";
        document.getElementById("togglebutton").innerHTML = "Power on";
        toggle = false;
        button.publish(zero);
        console.log("Off");
    }//power off
    else {
        document.getElementById("onoff").innerHTML = "On";
        document.getElementById("togglebutton").className = "btn btn-outline-danger mt-1 ms-2 mb-1";
        document.getElementById("togglebutton").innerHTML = "Power off";
        toggle = true;
        button.publish(one);
        console.log("On");
    }// power on
}
function clearReset() {
    document.getElementById("shape").innerHTML = "...";
    document.getElementById("color").innerHTML = "...";
    document.getElementById("position").innerHTML = "...";

    console.log("reset");
}//reset shape color and position
function circle() {
    document.getElementById("shape").innerHTML = "Circle";
    button.publish(three);

    console.log("Circle");
}
function rectangle() {
    document.getElementById("shape").innerHTML = "Rectangle";
    button.publish(two);

    console.log("Rectangle");
}
function red() {
    document.getElementById("color").innerHTML = "Red";
    button.publish(four);

    console.log("Red");
}
function green() {
    document.getElementById("color").innerHTML = "Green";
    button.publish(five);

    console.log("Green");
}
function box1() {
    document.getElementById("position").innerHTML = "Box1";
    button.publish(six);

    console.log("Box1");
}
function box2() {
    document.getElementById("position").innerHTML = "Box2";
    button.publish(seven);

    console.log("Box2");
}
function box3() {
    document.getElementById("position").innerHTML = "Box3";
    button.publish(eight);

    console.log("Box3");
}
function emer() {
    alert("cut off");
    power(true);
    clearReset();
    button.publish(zero);
    console.log("shut down");
}


