let member = ["egoing", "yu", "min"];
console.log(member[1]);
var i = 0;
while (i < member.length) {
    console.log("array loop : ", member[i])
    i = i + 1;
};

var role = {
    "programmer" : "egoing",
    "backend" : "yu",
    "front" : "min",
}
console.log(role.backend);
//이거몰랐음
for (let key in role) {
    console.log("obj => : ", key, ", value => : ", role[key]);
}

