//Ros server
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
var button2 = new ROSLIB.Topic({
    ros: ros,
    name: "/slideControl",
    messageType: "std_msgs/Float32MultiArray"
});

var joint_states = new ROSLIB.Topic({
    ros: ros,
    name: "joint_states",
    messageType: "sensor_msgs/JointState"
});
var button = new ROSLIB.Topic({
    ros: ros,
    name: "/button",
    messageType: "std_msgs/Int16MultiArray"
});
var but_arr = function (data) {
    var j = new ROSLIB.Message({
        data: data
    });
    button2.publish(j);
}
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(this.readyState ==4 && this.status==200){
        console.log(xhttp.responseText)
    }
}

number_obs.subscribe(function (k) {
    document.getElementById("num_objects").innerHTML = k.data;

});
type_obs.subscribe(function (k) {

    if (k.data.includes(1)) {
        document.getElementById("type_objectsGC").innerHTML = "G - C";
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
    }
    else {
        document.getElementById("type_objectsGR").innerHTML = [];
    }

});

ros.on('connection', function () {
    document.getElementById("status").innerHTML = "Connected";
});
ros.on('error', function (error) {
    document.getElementById("status").innerHTML = "Error";
});
ros.on('close', function () {
    document.getElementById("status").innerHTML = "Disconnect";
});
//camera stream
var createViewer2 = function (x,y) {
    var viewer = new MJPEGCANVAS.Viewer({
        divID: 'mjpeg2',
        host: 'localhost',
        height: x ,
        width: y ,
        topic: 'image_topic'
    });
}
//model stream
var urdf = function(x,y){
    var viewer = new ROS3D.Viewer({
        divID: 'urdf',
        height: x,
        width: y,
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
var wx = 0;
window.onload = function () {
    var sizew = document.getElementById('sizestream').clientWidth
    var sizeh = document.getElementById('sizestream').clientHeight
    var sizemw = document.getElementById('sizemodel').clientWidth
    var sizemh = document.getElementById('sizemodel').clientHeight

    var h = sizeh -150;
    var w = sizew -10-wx;
    var mh = sizemh -44;
    var mw = sizemw -10;

    createViewer2(h,w);
    urdf(mh,mw);
    

}
//button
var toggle = false;

function mode() {

    if (toggle == true) {
        $(document).ready(function(){
            $(function(){
                $.ajaxSetup ({
                    cache: false
                });
                var ajax_load = []
                var sizew = document.getElementById('sizestream').clientWidth
                var sizeh = document.getElementById('sizestream').clientHeight
                var sizemw = document.getElementById('sizemodel').clientWidth
                var sizemh = document.getElementById('sizemodel').clientHeight
                var h = sizeh -150;
                var w = sizew -10;
                var mh = sizemh -44;
                var mw = sizemw -10;
                $("#urdf").html(ajax_load).load(urdf(mh,mw));
            });
            $(function(){
                // don't cache ajax or content won't be fresh
                $.ajaxSetup ({
                    cache: false
                });
                var ajax_load = []
                var sizew = document.getElementById('sizestream').clientWidth
                var sizeh = document.getElementById('sizestream').clientHeight
                var sizemw = document.getElementById('sizemodel').clientWidth
                var sizemh = document.getElementById('sizemodel').clientHeight
                var h = sizeh -150;
                var w = sizew -10;
                $("#mjpeg2").html(ajax_load).load(createViewer2(h,w));

            });
        });
        
        document.getElementById("togglemode").className = "btn btn-outline-danger mt-1 ms-2 mb-1";
        document.getElementById("modechange").innerHTML = "Auto";
        document.getElementById("joint_cont").style.display = "none";

        toggle = false;
        console.log("Auto");
    }
    else {
        $(document).ready(function(){
            $(function(){
                // don't cache ajax or content won't be fresh
                $.ajaxSetup ({
                    cache: false
                });
                var ajax_load = [];
                var sizew = document.getElementById('sizestream').clientWidth
                var sizeh = document.getElementById('sizestream').clientHeight
                var sizemw = document.getElementById('sizemodel').clientWidth
                var sizemh = document.getElementById('sizemodel').clientHeight
                var h = sizeh -150;
                var w = sizew -10;
                var mh = sizemh -44;
                var mw = sizemw -10;
                $("#urdf").html(ajax_load).load(urdf(mh,mw));
            });
            $(function(){
                // don't cache ajax or content won't be fresh
                $.ajaxSetup ({
                    cache: false
                });
                var ajax_load = []
                var sizew = document.getElementById('sizestream').clientWidth
                var sizeh = document.getElementById('sizestream').clientHeight
                var sizemw = document.getElementById('sizemodel').clientWidth
                var sizemh = document.getElementById('sizemodel').clientHeight
                var h = sizeh -150;
                var w = sizew -10;
                $("#mjpeg2").html(ajax_load).load(createViewer2(h,w));
            });
        });
    

        document.getElementById("togglemode").className = "btn btn-outline-primary mt-1 ms-2 mb-1";
        document.getElementById("modechange").innerHTML = "Manual";
        document.getElementById("joint_cont").style.display = "initial";
        var a = [Math.random()*3.48,Math.random()*3.48,Math.random()*3.48,Math.random()*3.48,Math.random()*3.48,Math.random()*3.48]
        console.log(a);

    aj = function (data) {
        var j = new ROSLIB.Message({
            data: data
        });
        button2.publish(j);
    }
    aj(a);


    var slider1 = document.getElementById("myRange1");
    var output1 = document.getElementById("demo1");
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


    slider1.value = a[0];
    slider2.value = a[1];
    slider3.value = a[2];
    slider4.value = a[3];
    slider5.value = a[4];
    slider6.value = a[5];

    output1.innerHTML = slider1.value;
    output2.innerHTML = slider2.value;
    output3.innerHTML = slider3.value;
    output4.innerHTML = slider4.value;
    output5.innerHTML = slider5.value;
    output6.innerHTML = slider6.value;


    slider1.oninput = function () {
        output1.innerHTML = this.value;
    }
    slider1.onchange = function () {
        var join = output1.innerHTML
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
        toggle = true;
        console.log("Manual");
    }
}

function clearReset() {
    document.getElementById("shape").innerHTML = "...";
    document.getElementById("color").innerHTML = "...";
    document.getElementById("position").innerHTML = "...";
    console.log("reset");
}//reset shape color and position

function circle() {
    document.getElementById("shape").innerHTML = "Circle";
    var arr = [];
    arr[1]=3;
    console.log(arr);
    but_arr(arr);
}
function rectangle() {
    document.getElementById("shape").innerHTML = "Rectangle";
    var arr = [];
    arr[1]=4;
    console.log(arr);
    but_arr(arr);
}
function red() {
    document.getElementById("color").innerHTML = "Red";
    var arr = [];
    arr[0]=1
    console.log(arr);
    but_arr(arr);
}
function green() {
    document.getElementById("color").innerHTML = "Green";
    var arr = [];
    arr[0]=2
    console.log(arr);
    but_arr(arr);

    console.log("Green");
}
function box1() {
    document.getElementById("color").innerHTML = "Green";
    document.getElementById("shape").innerHTML = "Rectangle";
    var arr = [2,3];
    console.log(arr);
    but_arr(arr);
    
    

    // console.log("Box1");
}
function box2() {
    document.getElementById("color").innerHTML = "Green";
    document.getElementById("shape").innerHTML = "Circle";
    var arr = [2,4];
    console.log(arr);
    but_arr(arr);

    // console.log("Box2");
}
function box3() {
    document.getElementById("color").innerHTML = "Red";
    document.getElementById("shape").innerHTML = "Rectangle";
    var arr = [1,3];
    console.log(arr);
    but_arr(arr);

    // console.log("Box3");
}
function box4() {
    document.getElementById("color").innerHTML = "Red";
    document.getElementById("shape").innerHTML = "Circle";
    var arr = [1,4];
    console.log(arr);
    but_arr(arr);

    // console.log("Box3");
}
function emer() {
    alert("cut off");
    power(true);
    clearReset();
    button.publish(zero);
    console.log("shut down");
}


