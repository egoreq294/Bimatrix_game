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
    let SubMatrixesA = [];
    let SubMatrixesB = [];
    let indexSubMatrixesA = [];
    let indexSubMatrixesB = [];
    let SLAU_Solution_A = [];
    let SLAU_Solution_B = [];
    let Solution_Bimatix_Game_A = [];
    let Solution_Bimatix_Game_B = [];
    let lastIndexSubMatrixesA = [];
    let lastIndexSubMatrixesB = [];
    let predLastIndexSubMatrixesA = [];
    let predLastIndexSubMatrixesB = [];
    //алгоритм поиска в чистых стратегиях
    let A1=[];
    let B1=[];
    for(let i = 0; i < M; i++){
        A1[i]=[];
        B1[i]=[];
        for(let j = 0; j < N; j++){
            A1[i][j] = A[i][j];
            B1[i][j] = B[i][j];
        }
    }
    let matrixA = math.transpose(A1);    
    let SolutionPureStrategy = [];
    let SolutionPureStrategy_A = [];
    let SolutionPureStrategy_B = [];
    let matrixA1=[];
        for(let i = 0; i < N; i++){        
            matrixA1[i]=[]
            for(let j = 0; j < M; j++){            
                matrixA1[i][j] = matrixA[i][j];
            }
        }
        for(let i = 0; i < M; i++){
            let masB = B1[i].sort(function(a, b) {
               return a - b;
            });;
            let maxB = masB[masB.length-1];
            for(let j = 0; j < N; j++){
                if(maxB === B[i][j]){
                    SolutionPureStrategy_B.push([i,j]);
                }
            }
        }
        for(let i = 0; i < N; i++){
            let masA = matrixA1[i].sort(function(a, b) {
                return a - b;
              });;
              let maxA = masA[masA.length-1];
              for(let j = 0; j < M; j++){                
                if(maxA === matrixA[i][j]){
                    SolutionPureStrategy_A.push([j,i]);
                }
            }
        }
    
    for(let i = 0; i < SolutionPureStrategy_A.length; i++){
        for(let j = 0; j < SolutionPureStrategy_B.length; j++){
            if(SolutionPureStrategy_A[i][0]==SolutionPureStrategy_B[j][0] && SolutionPureStrategy_A[i][1]==SolutionPureStrategy_B[j][1]){
                SolutionPureStrategy.push(SolutionPureStrategy_A[i]);
            }
        }
    }
    if(SolutionPureStrategy.length != 0){
        document.querySelector('#result').innerHTML = '';
        document.querySelector('#result').innerHTML = 'Ситуации равновесия в чистых стратегиях: ';
        document.querySelector('#result').innerHTML +='<br>';
    for(let i = 0; i < SolutionPureStrategy.length; i++){        
        document.querySelector('#result').innerHTML += '(';
	    for(let j = 0; j < SolutionPureStrategy[i].length-1; j++)
	    {
	    	document.querySelector('#result').innerHTML += ((+SolutionPureStrategy[i][j]+1) + ', ');
	    }
        document.querySelector('#result').innerHTML += (Number(SolutionPureStrategy[i][SolutionPureStrategy[i].length-1])+1) + ')';
        document.querySelector('#result').innerHTML +='<br>';
    }
    }
    else{
    //алгоритм поиска в смешанных стратегиях
    if(N==10 && M==10){
        SubMatrixesA.push(A);
        SubMatrixesB.push(B);
        indexSubMatrixesA.push([[0],[1],[2],[3],[4]]);
        indexSubMatrixesB.push([[0],[1],[2],[3],[4]]);
    }    
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
                    indexSubMatrixesA.push([[+k1],[+k]]);
                    indexSubMatrixesB.push([[+i],[+j]]);
                    
                                        
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
                                indexSubMatrixesA.push([[+j1],[+j2],[+j3]]);
                                indexSubMatrixesB.push([[+i1],[+i2],[+i3]]);
                            }
                        }
                    }
                }
            }
        }
        
    }
    if(N >= 4 && M >= 4){
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
                                                        [A[i4][j1], A[i4][j2], A[i4][j3], A[i4][j4]]]);
                                        SubMatrixesB.push([[B[i1][j1], B[i1][j2], B[i1][j3], B[i1][j4]],
                                                        [B[i2][j1], B[i2][j2], B[i2][j3], B[i2][j4]],
                                                        [B[i3][j1], B[i3][j2], B[i3][j3], B[i3][j4] ],
                                                        [B[i4][j1], B[i4][j2], B[i4][j3], B[i4][j4]]]);                                                        
                                        indexSubMatrixesA.push([[+j1],[+j2],[+j3],[+j4]]);
                                        indexSubMatrixesB.push([[+i1],[+i2],[+i3],[+i4]]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(N >= 5 && M >= 5){
        // Сам алгоритм 5*5
        for (let i0 = 0; i0 < M - 4; i0++) // строки
            {
                for (let i1 = i0 + 1; i1 < M - 3; i1++) // строки
                {
                    for (let i2 = i1 + 1; i2 < M - 2; i2++) // строки
                    {
                        for (let i3 = i2 + 1; i3 < M - 1; i3++) // строки
                        {
                            for (let i4 = i3 + 1; i4 < M; i4++) // строки
                            {
                                for (let j0 = 0; j0 < N - 4; j0++) //столбцы
                                {
                                    for (let j1 = j0 + 1; j1 < N - 3; j1++) //столбцы
                                    {
                                        for (let j2 = j1 + 1; j2 < N - 2; j2++) // столбцы
                                        {
                                            for (let j3 = j2 + 1; j3 < N - 1; j3++) // столбцы
                                            {
                                                for (let j4 = j3 + 1; j4 < N; j4++) // столбцы
                                                {
                                                    SubMatrixesA.push([
                                                                    [A[i0][j0], A[i0][j1], A[i0][j2], A[i0][j3], A[i0][j4]],
                                                                    [A[i1][j0], A[i1][j1], A[i1][j2], A[i1][j3], A[i1][j4]],
                                                                    [A[i2][j0], A[i2][j1], A[i2][j2], A[i2][j3], A[i2][j4]],
                                                                    [A[i3][j0], A[i3][j1], A[i3][j2], A[i3][j3], A[i3][j4]],
                                                                    [A[i4][j0], A[i4][j1], A[i4][j2], A[i4][j3], A[i4][j4]],
                                                                ]);
                                                    SubMatrixesB.push([
                                                                    [B[i0][j0], B[i0][j1], B[i0][j2], B[i0][j3], B[i0][j4]],
                                                                    [B[i1][j0], B[i1][j1], B[i1][j2], B[i1][j3], B[i1][j4]],
                                                                    [B[i2][j0], B[i2][j1], B[i2][j2], B[i2][j3], B[i2][j4]],
                                                                    [B[i3][j0], B[i3][j1], B[i3][j2], B[i3][j3], B[i3][j4]],
                                                                    [B[i4][j0], B[i4][j1], B[i4][j2], B[i4][j3], B[i4][j4]],
                                                                ]);                                                        
                                                    indexSubMatrixesA.push([[+i0],[+j1],[+j2],[+j3],[+j4]]);
                                                    indexSubMatrixesB.push([[+j0],[+i1],[+i2],[+i3],[+i4]]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if(N >= 6 && M >= 6){
            // Сам алгоритм 6*6
            for (let i0 = 0; i0 < M - 5; i0++) // строки
                {
                    for (let i1 = i0 + 1; i1 < M - 4; i1++) // строки
                    {
                        for (let i2 = i1 + 1; i2 < M - 3; i2++) // строки
                        {
                            for (let i3 = i2 + 1; i3 < M - 2; i3++) // строки
                            {
                                for (let i4 = i3 + 1; i4 - 1 < M; i4++) // строки
                                {
                                    for (let i5 = i4 + 1; i5 < M; i5++) // строки
                                    {
                                        for (let j0 = 0; j0 < N - 5; j0++) //столбцы
                                        {
                                            for (let j1 = j0 + 1; j1 < N - 4; j1++) //столбцы
                                            {
                                                for (let j2 = j1 + 1; j2 < N - 3; j2++) // столбцы
                                                {
                                                    for (let j3 = j2 + 1; j3 < N - 2; j3++) // столбцы
                                                    {
                                                        for (let j4 = j3 + 1; j4 < N - 1; j4++) // столбцы
                                                        {
                                                            for (let j5 = j4 + 1; j5 < N; j5++) //столбцы
                                                            {
                                                            SubMatrixesA.push([
                                                                            [A[i0][j0], A[i0][j1], A[i0][j2], A[i0][j3], A[i0][j4], A[i0][j5]],
                                                                            [A[i1][j0], A[i1][j1], A[i1][j2], A[i1][j3], A[i1][j4], A[i1][j5]],
                                                                            [A[i2][j0], A[i2][j1], A[i2][j2], A[i2][j3], A[i2][j4], A[i2][j5]],
                                                                            [A[i3][j0], A[i3][j1], A[i3][j2], A[i3][j3], A[i3][j4], A[i3][j5]],                                                                            
                                                                            [A[i4][j0], A[i4][j1], A[i4][j2], A[i4][j3], A[i4][j4], A[i4][j5]],
                                                                            [A[i5][j0], A[i5][j1], A[i5][j2], A[i5][j3], A[i5][j4], A[i5][j5]],
                                                                        ]);
                                                            SubMatrixesB.push([
                                                                            [B[i0][j0], B[i0][j1], B[i0][j2], B[i0][j3], B[i0][j4], B[i0][j5]],
                                                                            [B[i1][j0], B[i1][j1], B[i1][j2], B[i1][j3], B[i1][j4], B[i1][j5]],
                                                                            [B[i2][j0], B[i2][j1], B[i2][j2], B[i2][j3], B[i2][j4], B[i2][j5]],
                                                                            [B[i3][j0], B[i3][j1], B[i3][j2], B[i3][j3], B[i3][j4], B[i3][j5]],                                                                            
                                                                            [B[i4][j0], B[i4][j1], B[i4][j2], B[i4][j3], B[i4][j4], B[i4][j5]],
                                                                            [B[i5][j0], B[i5][j1], B[i5][j2], B[i5][j3], B[i5][j4], B[i5][j5]],
                                                                        ]);                                                        
                                                            indexSubMatrixesA.push([[+i0],[+j1],[+j2],[+j3],[+j4],[+i5]]);
                                                            indexSubMatrixesB.push([[+j0],[+i1],[+i2],[+i3],[+i4],[+j5]]);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(N >= 7 && M >= 7){
                // Сам алгоритм 7*7
                for (let i0 = 0; i0 < M - 6; i0++) // строки
                {
                    for (let i1 = i0 + 1; i1 < M - 5; i1++) // строки
                    {
                        for (let i2 = i1 + 1; i2 < M - 4; i2++) // строки
                        {
                            for (let i3 = i2 + 1; i3 < M - 3; i3++) // строки
                            {
                                for (let i4 = i3 + 1; i4 - 2 < M; i4++) // строки
                                {
                                    for (let i5 = i4 + 1; i5 - 1 < M; i5++) // строки
                                    {
                                        for (let i6 = i5 + 1; i6 < M; i6++) // строки
                                        {
                                            for (let j0 = 0; j0 < N - 6; j0++) //столбцы
                                            {
                                                for (let j1 = j0 + 1; j1 < N - 5; j1++) //столбцы
                                                {
                                                    for (let j2 = j1 + 1; j2 < N - 4; j2++) // столбцы
                                                    {
                                                        for (let j3 = j2 + 1; j3 < N - 3; j3++) // столбцы
                                                        {
                                                            for (let j4 = j3 + 1; j4 < N - 2; j4++) // столбцы
                                                            {
                                                                for (let j5 = j4 + 1; j5 < N - 1; j5++) //столбцы
                                                                {
                                                                    for (let j6 = j5 + 1; j6 < N; j6++) //столбцы
                                                                    {
                                                                        SubMatrixesA.push([
                                                                                        [A[i0][j0], A[i0][j1], A[i0][j2], A[i0][j3], A[i0][j4], A[i0][j5], A[i0][j6]],
                                                                                        [A[i1][j0], A[i1][j1], A[i1][j2], A[i1][j3], A[i1][j4], A[i1][j5], A[i1][j6]],
                                                                                        [A[i2][j0], A[i2][j1], A[i2][j2], A[i2][j3], A[i2][j4], A[i2][j5], A[i2][j6]],
                                                                                        [A[i3][j0], A[i3][j1], A[i3][j2], A[i3][j3], A[i3][j4], A[i3][j5], A[i3][j6]],                                                                            
                                                                                        [A[i4][j0], A[i4][j1], A[i4][j2], A[i4][j3], A[i4][j4], A[i4][j5], A[i4][j6]],
                                                                                        [A[i5][j0], A[i5][j1], A[i5][j2], A[i5][j3], A[i5][j4], A[i5][j5], A[i5][j6]],
                                                                                        [A[i6][j0], A[i6][j1], A[i6][j2], A[i6][j3], A[i6][j4], A[i6][j5], A[i6][j6]],
                                                                                    ]);
                                                                        SubMatrixesB.push([
                                                                                        [B[i0][j0], B[i0][j1], B[i0][j2], B[i0][j3], B[i0][j4], B[i0][j5], B[i0][j6]],
                                                                                        [B[i1][j0], B[i1][j1], B[i1][j2], B[i1][j3], B[i1][j4], B[i1][j5], B[i1][j6]],
                                                                                        [B[i2][j0], B[i2][j1], B[i2][j2], B[i2][j3], B[i2][j4], B[i2][j5], B[i2][j6]],
                                                                                        [B[i3][j0], B[i3][j1], B[i3][j2], B[i3][j3], B[i3][j4], B[i3][j5], B[i3][j6]],                                                                            
                                                                                        [B[i4][j0], B[i4][j1], B[i4][j2], B[i4][j3], B[i4][j4], B[i4][j5], B[i4][j6]],
                                                                                        [B[i5][j0], B[i5][j1], B[i5][j2], B[i5][j3], B[i5][j4], B[i5][j5], B[i5][j6]],
                                                                                        [B[i6][j0], B[i6][j1], B[i6][j2], B[i6][j3], B[i6][j4], B[i6][j5], B[i6][j6]],
                                                                                    ]);                                                        
                                                                        indexSubMatrixesA.push([[+i0],[+j1],[+j2],[+j3],[+j4],[+i5],[+i6]]);
                                                                        indexSubMatrixesB.push([[+j0],[+i1],[+i2],[+i3],[+i4],[+j5],[+j6]]);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(N >= 8 && M >= 8){
                // Сам алгоритм 8*8
                for (let i0 = 0; i0 < M - 7; i0++) // строки
                {
                    for (let i1 = i0 + 1; i1 < M - 6; i1++) // строки
                    {
                        for (let i2 = i1 + 1; i2 < M - 5; i2++) // строки
                        {
                            for (let i3 = i2 + 1; i3 < M - 4; i3++) // строки
                            {
                                for (let i4 = i3 + 1; i4 - 3 < M; i4++) // строки
                                {
                                    for (let i5 = i4 + 1; i5 - 2 < M; i5++) // строки
                                    {
                                        for (let i6 = i5 + 1; i6 < M - 1; i6++) // строки
                                        {
                                            for (let i7 = i6 + 1; i7 < M; i7++) // строки
                                            {
                                                for (let j0 = 0; j0 < N - 7; j0++) //столбцы
                                                {
                                                    for (let j1 = j0 + 1; j1 < N - 6; j1++) //столбцы
                                                    {
                                                        for (let j2 = j1 + 1; j2 < N - 5; j2++) // столбцы
                                                        {
                                                            for (let j3 = j2 + 1; j3 < N - 4; j3++) // столбцы
                                                            {
                                                                for (let j4 = j3 + 1; j4 < N - 3; j4++) // столбцы
                                                                {
                                                                    for (let j5 = j4 + 1; j5 < N - 2; j5++) //столбцы
                                                                    {
                                                                        for (let j6 = j5 + 1; j6 < N - 1; j6++) //столбцы
                                                                        {
                                                                            for (let j7 = j6 + 1; j7 < N; j7++) //столбцы
                                                                            {
                                                                                SubMatrixesA.push([
                                                                                                [A[i0][j0], A[i0][j1], A[i0][j2], A[i0][j3], A[i0][j4], A[i0][j5], A[i0][j6], A[i0][j7]],
                                                                                                [A[i1][j0], A[i1][j1], A[i1][j2], A[i1][j3], A[i1][j4], A[i1][j5], A[i1][j6], A[i1][j7]],
                                                                                                [A[i2][j0], A[i2][j1], A[i2][j2], A[i2][j3], A[i2][j4], A[i2][j5], A[i2][j6], A[i2][j7]],
                                                                                                [A[i3][j0], A[i3][j1], A[i3][j2], A[i3][j3], A[i3][j4], A[i3][j5], A[i3][j6], A[i3][j7]],                                                                            
                                                                                                [A[i4][j0], A[i4][j1], A[i4][j2], A[i4][j3], A[i4][j4], A[i4][j5], A[i4][j6], A[i4][j7]],
                                                                                                [A[i5][j0], A[i5][j1], A[i5][j2], A[i5][j3], A[i5][j4], A[i5][j5], A[i5][j6], A[i5][j7]],
                                                                                                [A[i6][j0], A[i6][j1], A[i6][j2], A[i6][j3], A[i6][j4], A[i6][j5], A[i6][j6], A[i6][j7]],
                                                                                                [A[i7][j0], A[i7][j1], A[i7][j2], A[i7][j3], A[i7][j4], A[i7][j5], A[i7][j6], A[i7][j7]],
                                                                                            ]);
                                                                                SubMatrixesB.push([
                                                                                                [B[i0][j0], B[i0][j1], B[i0][j2], B[i0][j3], B[i0][j4], B[i0][j5], B[i0][j6], B[i0][j7]],
                                                                                                [B[i1][j0], B[i1][j1], B[i1][j2], B[i1][j3], B[i1][j4], B[i1][j5], B[i1][j6], B[i1][j7]],
                                                                                                [B[i2][j0], B[i2][j1], B[i2][j2], B[i2][j3], B[i2][j4], B[i2][j5], B[i2][j6], B[i2][j7]],
                                                                                                [B[i3][j0], B[i3][j1], B[i3][j2], B[i3][j3], B[i3][j4], B[i3][j5], B[i3][j6], B[i3][j7]],                                                                            
                                                                                                [B[i4][j0], B[i4][j1], B[i4][j2], B[i4][j3], B[i4][j4], B[i4][j5], B[i4][j6], B[i4][j7]],
                                                                                                [B[i5][j0], B[i5][j1], B[i5][j2], B[i5][j3], B[i5][j4], B[i5][j5], B[i5][j6], B[i5][j7]],
                                                                                                [B[i6][j0], B[i6][j1], B[i6][j2], B[i6][j3], B[i6][j4], B[i6][j5], B[i6][j6], B[i6][j7]],
                                                                                                [B[i7][j0], B[i7][j1], B[i7][j2], B[i7][j3], B[i7][j4], B[i7][j5], B[i7][j6], B[i7][j7]],
                                                                                            ]);                                                        
                                                                                indexSubMatrixesA.push([[+i0],[+j1],[+j2],[+j3],[+j4],[+i5],[+i6],[+i7]]);
                                                                                indexSubMatrixesB.push([[+j0],[+i1],[+i2],[+i3],[+i4],[+j5],[+j6],[+j7]]);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(N >= 9 && M >= 9){
                // Сам алгоритм 9*9
                for (let i0 = 0; i0 < M - 8; i0++) // строки
                {
                    for (let i1 = i0 + 1; i1 < M - 7; i1++) // строки
                    {
                        for (let i2 = i1 + 1; i2 < M - 6; i2++) // строки
                        {
                            for (let i3 = i2 + 1; i3 < M - 5; i3++) // строки
                            {
                                for (let i4 = i3 + 1; i4 - 4 < M; i4++) // строки
                                {
                                    for (let i5 = i4 + 1; i5 - 3 < M; i5++) // строки
                                    {
                                        for (let i6 = i5 + 1; i6 < M - 2; i6++) // строки
                                        {
                                            for (let i7 = i6 + 1; i7 < M - 1; i7++) // строки
                                            {
                                                for (let i8 = i7 + 1; i8 < M; i8++) // строки
                                                {
                                                    for (let j0 = 0; j0 < N - 8; j0++) //столбцы
                                                    {
                                                        for (let j1 = j0 + 1; j1 < N - 7; j1++) //столбцы
                                                        {
                                                            for (let j2 = j1 + 1; j2 < N - 6; j2++) // столбцы
                                                            {
                                                                for (let j3 = j2 + 1; j3 < N - 5; j3++) // столбцы
                                                                {
                                                                    for (let j4 = j3 + 1; j4 < N - 4; j4++) // столбцы
                                                                    {
                                                                        for (let j5 = j4 + 1; j5 < N - 3; j5++) //столбцы
                                                                        {
                                                                            for (let j6 = j5 + 1; j6 < N - 2; j6++) //столбцы
                                                                            {
                                                                                for (let j7 = j6 + 1; j7 < N - 1; j7++) //столбцы
                                                                                {
                                                                                    for (let j8 = j7 + 1; j8 < N; j8++) //столбцы
                                                                                    {
                                                                                        SubMatrixesA.push([
                                                                                                        [A[i0][j0], A[i0][j1], A[i0][j2], A[i0][j3], A[i0][j4], A[i0][j5], A[i0][j6], A[i0][j7], A[i0][j8]],
                                                                                                        [A[i1][j0], A[i1][j1], A[i1][j2], A[i1][j3], A[i1][j4], A[i1][j5], A[i1][j6], A[i1][j7], A[i1][j8]],
                                                                                                        [A[i2][j0], A[i2][j1], A[i2][j2], A[i2][j3], A[i2][j4], A[i2][j5], A[i2][j6], A[i2][j7], A[i2][j8]],
                                                                                                        [A[i3][j0], A[i3][j1], A[i3][j2], A[i3][j3], A[i3][j4], A[i3][j5], A[i3][j6], A[i3][j7], A[i3][j8]],                                                                            
                                                                                                        [A[i4][j0], A[i4][j1], A[i4][j2], A[i4][j3], A[i4][j4], A[i4][j5], A[i4][j6], A[i4][j7], A[i4][j8]],
                                                                                                        [A[i5][j0], A[i5][j1], A[i5][j2], A[i5][j3], A[i5][j4], A[i5][j5], A[i5][j6], A[i5][j7], A[i5][j8]],
                                                                                                        [A[i6][j0], A[i6][j1], A[i6][j2], A[i6][j3], A[i6][j4], A[i6][j5], A[i6][j6], A[i6][j7], A[i6][j8]],
                                                                                                        [A[i7][j0], A[i7][j1], A[i7][j2], A[i7][j3], A[i7][j4], A[i7][j5], A[i7][j6], A[i7][j7], A[i7][j8]],
                                                                                                        [A[i8][j0], A[i8][j1], A[i8][j2], A[i8][j3], A[i8][j4], A[i8][j5], A[i8][j6], A[i8][j7], A[i8][j8]],
                                                                                                    ]);
                                                                                        SubMatrixesB.push([
                                                                                                        [B[i0][j0], B[i0][j1], B[i0][j2], B[i0][j3], B[i0][j4], B[i0][j5], B[i0][j6], B[i0][j7], B[i0][j8]],
                                                                                                        [B[i1][j0], B[i1][j1], B[i1][j2], B[i1][j3], B[i1][j4], B[i1][j5], B[i1][j6], B[i1][j7], B[i1][j8]],
                                                                                                        [B[i2][j0], B[i2][j1], B[i2][j2], B[i2][j3], B[i2][j4], B[i2][j5], B[i2][j6], B[i2][j7], B[i2][j8]],
                                                                                                        [B[i3][j0], B[i3][j1], B[i3][j2], B[i3][j3], B[i3][j4], B[i3][j5], B[i3][j6], B[i3][j7], B[i3][j8]],                                                                            
                                                                                                        [B[i4][j0], B[i4][j1], B[i4][j2], B[i4][j3], B[i4][j4], B[i4][j5], B[i4][j6], B[i4][j7], B[i4][j8]],
                                                                                                        [B[i5][j0], B[i5][j1], B[i5][j2], B[i5][j3], B[i5][j4], B[i5][j5], B[i5][j6], B[i5][j7], B[i5][j8]],
                                                                                                        [B[i6][j0], B[i6][j1], B[i6][j2], B[i6][j3], B[i6][j4], B[i6][j5], B[i6][j6], B[i6][j7], B[i6][j8]],
                                                                                                        [B[i7][j0], B[i7][j1], B[i7][j2], B[i7][j3], B[i7][j4], B[i7][j5], B[i7][j6], B[i7][j7], B[i7][j8]],
                                                                                                        [B[i8][j0], B[i8][j1], B[i8][j2], B[i8][j3], B[i8][j4], B[i8][j5], B[i8][j6], B[i8][j7], B[i8][j8]],
                                                                                                    ]);                                                        
                                                                                        indexSubMatrixesA.push([[+i0],[+j1],[+j2],[+j3],[+j4],[+i5],[+i6],[+i7],[+i8]]);
                                                                                        indexSubMatrixesB.push([[+j0],[+i1],[+i2],[+i3],[+i4],[+j5],[+j6],[+j7],[+j8]]);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
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
        //
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
            predLastIndexSubMatrixesA.push(indexSubMatrixesA[k]);
            predLastIndexSubMatrixesB.push(indexSubMatrixesB[k]);
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
            lastIndexSubMatrixesA.push(predLastIndexSubMatrixesA[i]);
            lastIndexSubMatrixesB.push(predLastIndexSubMatrixesB[i]);
        }
    }    
    let almostSolutionP=[];
    let almostSolutionQ=[];
    //p и столбцы
    for(let i = 0; i < lastIndexSubMatrixesA.length; i++){
        let k=0;
        almostSolutionP[i]=[];
        let p = Array.from(Solution_Bimatix_Game_A[i]);
        for(let j = 0; j < N; j++){
            if(j==lastIndexSubMatrixesA[i][k]){
                almostSolutionP[i].push(+p[k]);
                k++;
            }
            else{
                almostSolutionP[i].push(Number(0));
            }
        }
    }
    //q и строки
    for(let i = 0; i < lastIndexSubMatrixesB.length; i++){
        let k=0;
        almostSolutionQ[i]=[];
        let q = Array.from(Solution_Bimatix_Game_B[i]);
        for(let j = 0; j < M; j++){
            if(j==lastIndexSubMatrixesB[i][k]){
                almostSolutionQ[i].push(+q[k]);
                k++;
            }
            else{
                almostSolutionQ[i].push(Number(0));
            }
        }
    }
    //проверка на ситуацию равновесия
    let solutionP=[];
    let solutionQ=[];
    let k = 0;
    for(let i = 0; i < almostSolutionP.length; i++){
        let pA = math.multiply(almostSolutionQ[i], A);
        let pAq = math.multiply(pA, almostSolutionP[i]);        
        let pB = math.multiply(almostSolutionQ[i], B);
        let pBq = math.multiply(pB, almostSolutionP[i]);
        let checkAq = math.multiply(A, almostSolutionP[i]);
        let checkpB = math.multiply(almostSolutionQ[i], B);
        let check1 = true;
        let check2 = true;        
        console.log('Решение СЛАУ А=', almostSolutionQ[i]);
        console.log('Решение СЛАУ B=', almostSolutionP[i]);
        console.log('va=',pAq);
        console.log('vb=',pBq);
        console.log('Aq=',checkAq);
        console.log('pB=',checkpB);
        console.log('-----------------------');
        for(let j = 0; j<checkAq.length;j++){
            if(+(checkAq[j].toFixed(2)) > +(pAq.toFixed(2))){
                check1 = false;
            }
        }
        for(let j = 0; j<checkpB.length;j++){
            if(+(checkpB[j].toFixed(2)) > (+pBq.toFixed(2))){
                check2 = false;
            }
        }        
        if(check1 === true && check2 === true){
            solutionP.push(almostSolutionP[i]);
            solutionQ.push(almostSolutionQ[i]);
        }
    }
    console.log(solutionP);
    console.log(solutionQ);

    document.querySelector('#result').innerHTML = '';
    document.querySelector('#result').innerHTML = 'Решение биматричной игры в смешанных стратегиях. <br >';
    for(let i = 0; i < solutionQ.length; i++){
        //Вывод p
        document.querySelector('#result').innerHTML += 'q = (';
	    for(let j = 0; j < solutionP[i].length-1; j++)
	    {
	    	document.querySelector('#result').innerHTML += ((+solutionP[i][j]).toFixed(2) + ', ');
	    }
        document.querySelector('#result').innerHTML += Number(solutionP[i][solutionP[i].length-1]).toFixed(2) + '), ';
        //Вывод q
        document.querySelector('#result').innerHTML += 'p = (';
	    for(let j = 0; j < solutionQ[i].length-1; j++)
	    {
	    	document.querySelector('#result').innerHTML += ((+solutionQ[i][j]).toFixed(2) + ', ');
	    }
        document.querySelector('#result').innerHTML += Number(solutionQ[i][solutionQ[i].length-1]).toFixed(2) + ') <br> ';
    }
    
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