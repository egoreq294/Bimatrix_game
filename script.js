let l = () => {
const a = [[2,2],[3,4]];
const b = [2,3];
const x = Array.from(math.lusolve(a,b));
document.querySelector('#result').innerHTML = '( ';
for(let i = 0; i < a.length-1; i++)
    {
	    document.querySelector('#result').innerHTML += (x[i]+', ');
    }
document.querySelector('#result').innerHTML +=x[1] + ' )';
}
let Create = () => {
    let M = +document.querySelector('#M').value;
    let N = +document.querySelector('#N').value;
    console.log(N);
    console.log(M);
    
}