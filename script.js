var player1=prompt("Enter the name of the player one,youl'll be red");
var player2=prompt("Enter the name of the player two,you'll be yellow");
var player1Color='rgb(201, 0, 0)';
var player2Color='rgb(247, 247, 0)';
var defColor='rgb(0, 0, 0)';

console.log("doc has loaded");
var game_on=true;
var table=$('table tr');

function reportColor(rowIndex,colIndex)
{
    if(rowIndex>5 || colIndex>6 || rowIndex<0 || colIndex<0)
    return defColor;
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function changeColor(rowIndex,colIndex,currentColor)
{
    table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',currentColor);
}

function checkBottom(colIndex)
{
    var row=5;

    for(row=5;row>=0;row--)
    {
        if(reportColor(row,colIndex)===defColor)
        {
            return row;
        }
    }
    return 'yellow';
}

function colorMatchCheck(one,two,three,four)
{
    if (one===two && one===three && one===four && one!==defColor)
    {
        // console.log(one,two,three,four);
        return true;
    }
    return false;
}

function horizontalWinCheck()
{
    for(var row=0;row<6;row++)
    {
        for(var col=0;col<4;col++)
        {
            if(colorMatchCheck(reportColor(row,col),reportColor(row,col+1),reportColor(row,col+2),reportColor(row,col+3)))
            {
                // console.log(row,col);
                return true;
            }
        }
    }
}

function verticalWinCheck()
{
    for(var col=0;col<7;col++)
    {
        for(var row=0;row<3;row++)
        {
            if(colorMatchCheck(reportColor(row,col),reportColor(row+1,col),reportColor(row+2,col),reportColor(row+3,col)))
            {
                
                return true;
            }
        }
    }
}

function diagonalWinCheck()
{
    for(var col=0;col<7;col++)
    {
        for(var row=0;row<6;row++)
        {
            if(colorMatchCheck(reportColor(row,col),reportColor(row+1,col+1),reportColor(row+2,col+2),reportColor(row+3,col+3)))
            {
                // console.log(row,col);
                return true;
            }
            if(colorMatchCheck(reportColor(row,col),reportColor(row+1,col-1),reportColor(row+2,col-2),reportColor(row+3,col-3)))
            {
                // console.log(row,col);
                return true;
            }
        }
    }
}

var currentPlayer=1;
var currentColor=player1Color;
var currentName=player1;

$('h3').text(player1+" it is your turn , pick a coloumn and drop in!");
var turns=0;

$('.table button').on('click',function()
{
    turns++;
    if(turns>42)
    {
        $('h3').text(' The game has been draw!');
        $('h3').css('background-color','pink');
        return;
    }
    console.log("Button is clicked");
    var col=$(this).closest('td').index();
    var bottomAvail=checkBottom(col);

    if(horizontalWinCheck()||verticalWinCheck()||diagonalWinCheck())
        {
            // console.log(horizontalWinCheck());
            // console.log(verticalWinCheck());
            // console.log(diagonalWinCheck());
            $('h3').text(currentName+' You have won!');
            $('h3').css('background-color','pink');
            return;
        }

    if(reportColor(bottomAvail,col)!=defColor)
    {
        window.prompt('There is no empty cell in the coloumn clicked,please select any other coloumn');
    }
    else
    {
        if(horizontalWinCheck()||verticalWinCheck()||diagonalWinCheck())
        {
            $('h3').text(currentName+' You have won!');
            $('h3').css('background-color','pink');
            return;
        }
        changeColor(bottomAvail,col,currentColor);

        if(horizontalWinCheck()||verticalWinCheck()||diagonalWinCheck())
        {
            $('h3').text(currentName+' You have won!');
            $('h3').css('background-color','pink');
            return;
        }

        if(currentPlayer===1)
        {
            currentName=player2;
            currentPlayer=-1;
            currentColor=player2Color;
            $('h3').text(currentName+' it is your turn');
        }
        else
        {
            currentName=player1;
            currentPlayer=1;
            currentColor=player1Color;
            $('h3').text(currentName+' it is your turn');
        }
    }

})





