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
        
    }
    else {
        document.getElementById("type_objectsGC").innerHTML = [ ];
    }

    if (k.data.includes(0)) {
        document.getElementById("type_objectsRC").innerHTML = "R - C";

    }
    else {
        document.getElementById("type_objectsRC").innerHTML = [ ];
    }


    if (k.data.includes(3)) {
        document.getElementById("type_objectsRR").innerHTML = "R - R";
       

    }
    else {
        document.getElementById("type_objectsRR").innerHTML = [ ];
    }

    if (k.data.includes(2)) {
        document.getElementById("type_objectsGR").innerHTML = "G - R";
        


    }
    else {

        document.getElementById("type_objectsGR").innerHTML = [ ];

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
    document.getElementById("status").innerHTML = "Disconnect";

});


    
    createViewer2 = function () {
        if(window.innerWidth>1200){
            var viewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg2',
                host: 'localhost',
                height:220*2,
                width:300*2,
                topic: 'image_topic'
            });

        }
        else if(window.innerWidth<=1200 && window.innerWidth>=1100 ){
            var viewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg2',
                host: 'localhost',
                height:320,
                width:300,
                topic: 'image_topic'
            });
        }
        else if(window.innerWidth<1100 && window.innerWidth>=950 ){
            var viewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg2',
                host: 'localhost',
                height:320,
                width:250,
                topic: 'image_topic'
            });
        }
        else if(window.innerWidth<950 && window.innerWidth>=900 ){
            var viewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg2',
                host: 'localhost',
                height:320,
                width:230,
                topic: 'image_topic'
            });
        }
        else{
            var viewer = new MJPEGCANVAS.Viewer({
                divID: 'mjpeg2',
                host: 'localhost',
                height:320,
                width:190,
                topic: 'image_topic'
            });

        }
    }





window.onload = function () {
  
    
    var button = new ROSLIB.Topic({
        ros: ros,
        name: "/slideControl",
        messageType: "std_msgs/Float32MultiArray"
    });
    // publish to ros code here
    
    var joint_states = new ROSLIB.Topic({
        ros: ros,
        name: "joint_states",
        messageType: "sensor_msgs/JointState"
    });

    var a=[1,2,3,1,2,3] // test feedback
    console.log(a);
    
    joint_states.subscribe(function (m) {
        var val = m.position[0];
        console.log(val)
      
        a = m.position;
        console.log(a);
        
        //feedback joint states

    });

    aj = function (data) {
        var j = new ROSLIB.Message({
            data: data
        });
        button.publish(j);
    }

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    var slider2 = document.getElementById("myRange2");
    var output2 = document.getElementById("demo2");
    var slider3 = document.getElementById("myRange3");
    var output3 = document.getElementById("demo3");
    var slider4 = document.getElementById("myRange4");
    var output4 = document.getElementById("demo4");
    var slider5 = document.getElementById("myRange5");
    var output5 = document.getElementById("demo5");
    var slider6 = document.getElementById("myRange6");
    var output6 = document.getElementById("demo6");

    slider.value = a[0];
    slider2.value = a[1];
    slider3.value = a[2];
    slider4.value = a[3];
    slider5.value = a[4];
    slider6.value = a[5];

    output.innerHTML = slider.value;
    output2.innerHTML = slider2.value;
    output3.innerHTML = slider3.value;
    output4.innerHTML = slider4.value;
    output5.innerHTML = slider5.value;
    output6.innerHTML = slider6.value;



    
    slider.oninput = function () {
        output.innerHTML = this.value;
    }
    slider.onchange = function () {
        var join = output.innerHTML
        console.log(join)
        a[0] = Number(join)
        console.log(a)
        aj(a);
    }
    slider2.oninput = function () {
        output2.innerHTML = this.value;
    }
    
    slider2.onchange = function () {
        output2.innerHTML = this.value;
        var join2 = output2.innerHTML
        a[1] = Number(join2)

        console.log(a)
        aj(a);
    }
    slider3.oninput = function () {
        output3.innerHTML = this.value;
    }
    slider3.onchange = function () {
        output3.innerHTML = this.value;
        var join3 = output3.innerHTML
        a[2] = Number(join3)

        console.log(a)
        aj(a);
    }
    slider4.oninput = function () {
        output4.innerHTML = this.value;
    }
    slider4.onchange = function () {
        output4.innerHTML = this.value;
        var join4 = output4.innerHTML
        a[3] = Number(join4)

        console.log(a)
        aj(a);
    }
    slider5.oninput = function () {
        output5.innerHTML = this.value;
    }
    slider5.onchange = function () {
        output5.innerHTML = this.value;
        var join5 = output5.innerHTML
        a[4] = Number(join5)

        console.log(a)
        aj(a);
    }
    slider6.oninput = function () {
        output6.innerHTML = this.value;
    }
    slider6.onchange = function () {
        output6.innerHTML = this.value;
        var join6 = output6.innerHTML
        a[5] = Number(join6)

        console.log(a)
        aj(a);
    }
    
    createViewer2();


    
    var viewer = new ROS3D.Viewer({
        divID: 'urdf',
        height:220*2,
        width:300*2,
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
        path: 'https://raw.githubusercontent.com/rusdee-auto11/braccio_urdf/main/braccio/',
        rootObject: viewer.scene,
        loader: ROS3D.COLLADA_LOADER_2
    });



}
//button
var toggle = false;
function power() {
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
    console.log(window.innerWidth);
    
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


