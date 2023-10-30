let v1 = "v1";
// 100000 code;;;
v1 = "egoing";

//10000 code;;;
//help me;;;
let v2 = "v2";
//refact

let o = {
    v1: "v1",
    v2: "v2",
    f1: function(){
        console.log(o.v1); // let o -> let p로 변경하면 오류남
        console.log(this.v1); //let o -> let p로 변경해도 오류 안남
    }, //변수가 o이다. 객체 안에서 참조하면 this로 하자
};

// function f1() {    
//     console.log(o.v1);
// };

//결국 코드 정리를 하기위해서 존재한다.


// ... ...
//갑자기 누가 똑같은 이름에 함수를 만들었다...
function f1() {

}


function f2() {
    console.log(o.v2);
};



