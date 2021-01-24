// selection de toutes les balises <a> de class ".add-card"
let cards=document.querySelectorAll('.add-card');
//creation d'une liste "products" qui contient (name,tag,price,incart) de tous les composants.
let products=[
    {
        name:'LED MONITOR',
        tag:'ecran',
        price:200,
        incart:0
    },
    {
        name:'Central Unit',
        tag:'uc',
        price:300,
        incart:0
    },
    {
        name:'KeyBord',
        tag:'clavier',
        price:50,
        incart:0
    },
    {
        name:'Mouse',
        tag:'souris',
        price:30,
        incart:0
    }
];
//Add Event to 'add cards' bottons in a for loop
for(let i=0;i<cards.length;i++){
    cards[i].addEventListener('click',()=>
    { CardNumber(products[i]);
    TotalCost(products[i])
    });
}
// Fonction1 = LoadproductNumber 
function LoadproductNumber(){
    let productNumber=localStorage.getItem('CardNumber');
    if(productNumber){
        document.querySelector('.card span').textContent=productNumber;     
    }
}
// Fonction2 = CardNumber
function CardNumber (product){
   let productNumber=localStorage.getItem('CardNumber');
   productNumber=parseInt(productNumber);
  
   if (productNumber){
   localStorage.setItem('CardNumber',productNumber+1);  
   document.querySelector('.card span').textContent=productNumber+1; 
   }
   else {
   localStorage.setItem('CardNumber',1); 
   document.querySelector('.card span').textContent=1;
   }
   setItems(product);
}

function setItems(product){
    let CardItems=localStorage.getItem('productsInCard')
    CardItems=JSON.parse(CardItems);

    if(CardItems!= null){
        if(CardItems[product.tag]==undefined)
        {
            CardItems={
                ...CardItems,
                [product.tag]:product
            }
        }
    CardItems[product.tag].incart += 1;
    }
    else {
    product.incart=1;
    CardItems={
    [product.tag]:product
    }
    }
    localStorage.setItem('productsInCard',JSON.stringify(CardItems));
    }

    function TotalCost(product){
    let cardcost=localStorage.getItem('TotalCost');
    if(cardcost != null){
    cardcost=parseInt(cardcost);
    localStorage.setItem('TotalCost',cardcost + product.price);
    }
    else{
    localStorage.setItem('TotalCost',product.price);
    }
    }
       
    function displayCard(){
    let cardcost=localStorage.getItem('TotalCost');
    let CardItems=localStorage.getItem('productsInCard');
    CardItems=JSON.parse(CardItems);
    let productcontainer=document.querySelector('.product');
    if (CardItems && productcontainer){
            productcontainer.innerHTML='';
            Object.values(CardItems).map(item => {
            productcontainer.innerHTML+=`
            <div class="products">

            <ion-icon class="ion" name="close-circle-outline"></ion-icon>
            <img src="${item.tag}.jpg" class="tiw1">
            <span>${item.name}</span>
          
            <div class ="align"  class="price"> <span>${item.price}</span></div>

            <div class ="align" class="quantity> 
            <ion-icon name="arrow-dropleft-circle"></ion-icon>
            <ion-icon class="remove" name="remove-circle-outline"></ion-icon>
            <span class="span">${item.incart} </span>
            <ion-icon class="icon" name="add-circle-outline"></ion-icon>
            </div>

            <div class="total">${item.incart*item.price}</div>
            </div>
            `
            });
            productcontainer.innerHTML+=`
            <div class="TotalContainer">
            <h4 class="TotalTitle">
            Total Cost : 
            </h4>
            <h4>
            TND${cardcost},00
            </h4>
            </div>
            `
        }
    }
    LoadproductNumber();
    displayCard();
    var Ion=document.querySelectorAll('.ion');
    Array.from(Ion).map((i)=>{
        i.addEventListener('click',()=>{
            i.parentElement.remove();
        })
    })
    var Remove=document.querySelectorAll('.remove');
    Array.from(Remove).map((i)=>{
        i.addEventListener('click',()=>{
            if(i.nextElementSibling.innerHTML>0){
        (i.nextElementSibling.innerHTML)=parseInt(i.nextElementSibling.innerHTML)-1;
            }
        })
    })

    var Nbr=document.querySelectorAll('.icon');
    Array.from(Nbr).map((i)=>{
    i.addEventListener('click',()=>{
    (i.previousElementSibling.innerHTML)=parseInt(i.previousElementSibling.innerHTML)+1;
    })
    })
    
    /*let icon=document.querySelector('.icon');
    if(icon.clicked == true){
    console.log(icon);
    
}
    for(let i=0;i<icon.length;i++){
    icon[i].addEventListener('click',fun);
    
    if(icon[i].clicked == true){
        function fun() {
            let CardItems=localStorage.getItem('productsInCard');
            let span=document.querySelector('.span');
            CardItems=JSON.parse(CardItems);
                if (CardItems && span){
                    span.innerHTML='';
                    Object.values(CardItems).map(item => {
                    span.innerHTML+=`
                    <span class="span">${item.incart+1} </span>`
        
                 })
                 }
                } 
            }
    }*/
    //let Heart1=document.querySelectorAll('.heart1');
    //let Heart2=document.querySelectorAll('.heart2');
    //let Heart3=document.querySelectorAll('.heart3');
    //for(let j=0;j<= Heart1.length;j++){
     //   Heart1[j].addEventListener('click',()=>Heart1[j].style.color='red');
     //   Heart2[j].addEventListener('click',()=>Heart2[j].style.color='yellow');
      //  Heart3[j].addEventListener('click',()=>Heart3[j].style.color='green');
    //}
    let Heart=document.querySelectorAll('.heart');
    Array.from(Heart).map((i)=>{
        i.addEventListener('click',()=>{
            i.classList.toggle('heart-red');
        })
    })
