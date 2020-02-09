let Solve_Bimatrix_Game = () => {
    let M = +document.querySelector('#M').value;
    let N = +document.querySelector('#N').value;
    const A = [];
    const B = [];
    
    for(let i = 0; i < M; i++){ 
        A[i] =[];
        B[i] =[];
        for(let j = 0; j < N; j++){
            A[i][j] = +document.querySelector(`#a1_${i}${j}`).value;
            B[i][j] = +document.querySelector(`#a2_${i}${j}`).value;
        }
    }
    let SubMatrixesA=[];
    let SubMatrixesB=[];
    let SLAU_Solution_A = [];
    let SLAU_Solution_B = [];
    let Solution_Bimatix_Game_A = [];
    let Solution_Bimatix_Game_B = [];
    //алгоритм поиска в чистых стратегиях
    /*for(let i = 0; i < N; i++){
        for(let j = 0; j < M; j++){

        }
    }*/
    //алгоритм поиска в смешанных стратегиях
    // Сам алгоритм 2*2
    for (let i = 0; i < M - 1; i++) // строки
    {
        for (let j = i + 1; j < M; j++) // строки
        {
            for (let k1 = 0; k1 < N - 1; k1++) //столбцы
            { 
                for (let k = k1 + 1; k < N; k++) // столбцы
                {
                    SubMatrixesA.push([[A[i][k1], A[i][k]],
                                        [A[j][k1], A[j][k]]]);
                    SubMatrixesB.push([[B[i][k1], B[i][k]],
                                        [B[j][k1], B[j][k]]]);
                                        
                }
            }
        }
    }
    if(N >= 3 && M >= 3){
    // Сам алгоритм 3*3
        for (let i1 = 0; i1 < M - 2; i1++) // строки
        {
            for (let i2 = i1 + 1; i2 < M - 1; i2++) // строки
            {
                for (let i3 = i2 + 1; i3 < M; i3++) // строки
                {
                    for (let j1 = 0; j1 < N - 2; j1++) //столбцы
                    {
                        for (let j2 = j1 + 1; j2 < N - 1; j2++) // столбцы
                        {
                            for (let j3 = j2 + 1; j3 < N; j3++) // столбцы
                            {
                                SubMatrixesA.push([[A[i1][j1], A[i1][j2], A[i1][j3]],
                                                    [A[i2][j1], A[i2][j2], A[i2][j3]],
                                                    [A[i3][j1], A[i3][j2], A[i3][j3]]]);
                                SubMatrixesB.push([[B[i1][j1], B[i1][j2], B[i1][j3]],
                                                    [B[i2][j1], B[i2][j2], B[i2][j3]],
                                                    [B[i3][j1], B[i3][j2], B[i3][j3]]]); 
                            }
                        }
                    }
                }
            }
        }
        
    }
    else if(N >= 4 && M >= 4){
    // Сам алгоритм 4*4
        for (let i1 = 0; i1 < M - 3; i1++) // строки
        {
            for (let i2 = i1 + 1; i2 < M - 2; i2++) // строки
            {
                for (let i3 = i2 + 1; i3 < M - 1; i3++) // строки
                {
                    for (let i4 = i3 + 1; i4 < M; i4++) // строки
                    {
                        for (let j1 = 0; j1 < N - 3; j1++) //столбцы
                        {
                            for (let j2 = j1 + 1; j2 < N - 2; j2++) // столбцы
                            {
                                for (let j3 = j2 + 1; j3 < N - 1; j3++) // столбцы
                                {
                                    for (let j4 = j3 + 1; j4 < N; j4++) // столбцы
                                    {
                                        SubMatrixesA.push([[A[i1][j1], A[i1][j2], A[i1][j3], A[i1][j4]],
                                                        [A[i2][j1], A[i2][j2], A[i2][j3], A[i2][j4]],
                                                        [A[i3][j1], A[i3][j2], A[i3][j3], A[i3][j4] ],
                                                        [A[i4][j1], A[i4][j2], A[i4][j3], A[i4][j4]]])
                                        SubMatrixesB.push([[B[i1][j1], B[i1][j2], B[i1][j3], B[i1][j4]],
                                                        [B[i2][j1], B[i2][j2], B[i2][j3], B[i2][j4]],
                                                        [B[i3][j1], B[i3][j2], B[i3][j3], B[i3][j4] ],
                                                        [B[i4][j1], B[i4][j2], B[i4][j3], B[i4][j4]]])
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    for(let k = 0; k < SubMatrixesA.length; k++){
        //Составляем и решаем СЛАУ с матрией А
        //Преобразовывсаем матрицу
        const LastSubMatrixA = [];
        for(let i = 0; i < SubMatrixesA[k].length + 1; i++){
            LastSubMatrixA [i] = [];
        }
        for(let i = 0; i < SubMatrixesA[k].length; i++){            
            for(let j = 0; j < SubMatrixesA[k].length; j++){
                LastSubMatrixA [i][j] = SubMatrixesA[k][i][j];
            }   
        }
        for(let i = 0; i < SubMatrixesA[k].length; i++){
            LastSubMatrixA [i][SubMatrixesA[k].length] = -1;
        }
        for(let i = 0; i < SubMatrixesA[k].length; i++){
            LastSubMatrixA [SubMatrixesA[k].length][i] = 1;
        }
        LastSubMatrixA [SubMatrixesA[k].length][SubMatrixesA[k].length] = 0;
        //Создаем вектор столбец
        const vector1 = [];
        for(let i = 0; i < SubMatrixesA[k].length; i++){
            vector1[i] = 0;
        }
        vector1[SubMatrixesA[k].length] = 1;
        //Составляем и решаем СЛАУ с матрией B
        //Преобразовывсаем матрицу
        SubMatrixesB[k] = math.transpose(SubMatrixesB[k]);
        const LastSubMatrixB = []
        for(let i = 0; i < SubMatrixesB[k].length + 1; i++){
            LastSubMatrixB [i] = [];
        }
        for(let i = 0; i < SubMatrixesB[k].length; i++){            
            for(let j = 0; j < SubMatrixesB[k].length; j++){
                LastSubMatrixB [i][j] = SubMatrixesB[k][i][j];
            }   
        }
        for(let i = 0; i < SubMatrixesB[k].length; i++){
            LastSubMatrixB [i][SubMatrixesB[k].length] = -1;
        }
        for(let i = 0; i < SubMatrixesB[k].length; i++){
            LastSubMatrixB [SubMatrixesB[k].length][i] = 1;
        }
        LastSubMatrixB [SubMatrixesB[k].length][SubMatrixesB[k].length] = 0;
        //Создаем вектор столбец
        const vector2 = [];
        for(let i = 0; i < SubMatrixesB[k].length; i++){
            vector2[i] = 0;
        }
        vector2[SubMatrixesB[k].length] = 1;        
        //Решаем СЛАУ
        if( +(math.det(LastSubMatrixA)).toFixed(2)!= 0 && +(math.det(LastSubMatrixB)).toFixed(2)!= 0){
            SLAU_Solution_A.push(Array.from(math.lusolve(LastSubMatrixA,vector1)));
            SLAU_Solution_B.push(Array.from(math.lusolve(LastSubMatrixB,vector2)));
        }
    }
    //Проверка на неотрицальность p и q, при этом на v1,v2 внимания не обращаем
    for( let i = 0; i < SLAU_Solution_A.length; i++){
        let positiveA = true;
        let positiveB = true;
        for(let j = 0; j < SLAU_Solution_A[i].length - 1; j++){                
            if(SLAU_Solution_A[i][j] < 0){positiveA = false;}
            if(SLAU_Solution_B[i][j] < 0){positiveB = false;}
        }
        if(positiveA == true && positiveB == true){
            Solution_Bimatix_Game_A.push(SLAU_Solution_A[i]);
            Solution_Bimatix_Game_B.push(SLAU_Solution_B[i]);
        }
    }
    console.log(SLAU_Solution_A);
    console.log(Solution_Bimatix_Game_A);
    console.log(SLAU_Solution_B);
    console.log(Solution_Bimatix_Game_B);
    document.querySelector('#result').innerHTML = '';
    for(let i = 0; i < Solution_Bimatix_Game_A.length; i++){
        //Вывод p
        let p = Array.from(Solution_Bimatix_Game_A[i]);
        document.querySelector('#result').innerHTML += 'p = (';
	    for(let j = 0; j < Solution_Bimatix_Game_A[i].length-2; j++)
	    {
	    	document.querySelector('#result').innerHTML += ((+p[j]).toFixed(2) + ', ');
	    }
        document.querySelector('#result').innerHTML += Number(p[p.length-2]).toFixed(2) + '), ';        
        //Вывод q
        let q = Array.from(Solution_Bimatix_Game_B[i])
        document.querySelector('#result').innerHTML += 'q = (';
	    for(let j = 0; j < Solution_Bimatix_Game_B[i].length-2; j++)
	    {
	    	document.querySelector('#result').innerHTML += ((+q[j]).toFixed(2) + ', ');
	    }
        document.querySelector('#result').innerHTML += Number(q[q.length-2]).toFixed(2) + ') ';
        document.querySelector('#result').innerHTML +='<br>';
    }
    if(document.querySelector('#result').innerHTML == ''){
        document.querySelector('#result').innerHTML = 'В этой игре решение необходимо искать в чистых стратегиях'
    }
    
}
let Create_Matrix = () => {
    let M = +document.querySelector('#M').value;
    let N = +document.querySelector('#N').value;
    document.querySelector('#matrix1').innerHTML = '';      
    for(let i = 0; i < M; i++){ 
        for(let j = 0; j < N; j++){
            document.querySelector('#matrix1').innerHTML +=`<input class=matrix id=a1_${i}${j}></input>`;
        }
        document.querySelector('#matrix1').innerHTML +='<br>';
    }
    document.querySelector('#matrix2').innerHTML = '';      
    for(let i = 0; i < M; i++){ 
        for(let j = 0; j < N; j++){
            document.querySelector('#matrix2').innerHTML +=`<input class=matrix id=a2_${i}${j}></input>`;
        }
        document.querySelector('#matrix2').innerHTML +='<br>';
    }
    document.querySelector('#result').innerHTML = '';
}