let  f = function(){
    console.log(1+1);
    console.log(1+2);
}
//state?
//[f]
let a = [f];
a[0]();
//배열의 원소로서 함수가 존재
var o ={
    func:f //prop
}
o.func(); //2,3 출력
//함수는 값이기도 하다.
console.log(f);
f();
// let i = if(true){console.log(1)};
//조건문은 값이 아니기 떄문 에러

//let w while(true){console.log(1)};
//while state 값이 될수 없다.