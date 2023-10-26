/* function a() {
    console.log("a")
} */
const a = function () {
    console.log("a")
} // 기능은 같지만 익명함수 
//함수가 값이다.
//위 아래 함수는 같은 기능한다.


function slowfunc(callback) {
    callback();
}
slowfunc(a);
//slfunc함수는 파라미터 함수를 호출한다.
// slowfunc(a) 호출 a 전달 var a 선언만 한다. callback일 경우
// slowfunc(a) 호출 a 전달 var a 함수 실행 callback() 경우