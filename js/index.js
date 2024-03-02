const allCategories = document.getElementById('all-categories');
const allCategoriesCard = document.getElementById('all-categories-card');
const drawingCard = document.getElementById('drawing-categorie-card');

const loadCategory = async () =>{
    const url = 'https://openapi.programming-hero.com/api/videos/categories';
    const res = await fetch(url)
    const data = await res.json();
    const categories = data.data;
    displayCategorie(categories);
}

allCategories.addEventListener('click',function(e){
    const bgColors = allCategories.children;
    for (const item of bgColors) {
        item.style.backgroundColor = '#E5E6E6'
        item.style.color = 'black'
    }

    const button = e.target;
    if(button.classList.contains('category-button')){
        button.style.backgroundColor = 'red'
        button.style.color = '#fff'
    }
    //  allCategories.style.backgroundColor = '#ffff'

   
})

// display categories button
const displayCategorie = (categories) =>{
    categories.forEach(singleCategorie => {
        console.log(singleCategorie);
        const newBtn = document.createElement('button');
        newBtn.className = `btn`
        newBtn.innerHTML = `${singleCategorie?.category}`;
        allCategories.appendChild(newBtn);

        // EventListener add 
        newBtn.addEventListener('click',() => handleSearchCategory(singleCategorie.category_id))
    });
}




let selectedCategory = 1000;
const handleSearchCategory = async (categoryId) =>{
    selectedCategory = categoryId
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    const res = await fetch(url)
    const data = await res.json()
    const cards = data.data;
    displayCategorieCard(cards)
}
// display categories card
const displayCategorieCard = (cards) =>{
    if(cards.length === 0){
        drawingCard.classList.remove('hidden');
    }
    else{
        drawingCard.classList.add('hidden');
    }
    allCategoriesCard.textContent = '';


    let verifiedBadge = ''
   cards.forEach(singleCard =>{
    console.log(singleCard.authors[0].verified);
    if(singleCard.authors[0].verified){
        verifiedBadge = `<img src="images/verify.png" alt="">`
    }
    const div = document.createElement('div');
    div.innerHTML = `
    <figure><img class="h-[200px] object-cover" src="${singleCard.thumbnail}" alt="Shoes" /></figure>
    <div class="flex justify-center items-center gap-2">
      <img class="w-[40px] h-[40px] rounded-full border-2 border-red-500 my-4 object-cover" src="${singleCard.authors[0].profile_picture}" alt="">
        <div class="mt-4">
            <p>Building a Winning UX Strategy Using the Kano Model</p>
            <div class="flex gap-2">
                <h3 class="font-bold">${singleCard.authors[0].profile_name}</h3>
                <p>${verifiedBadge}</p>
            </div>
            <h3>${singleCard.others.views}  views</h3>
    </div>
  </div>
    `
    allCategoriesCard.appendChild(div)
   })
}
handleSearchCategory(selectedCategory)
loadCategory()