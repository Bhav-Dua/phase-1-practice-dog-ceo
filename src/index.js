console.log('%c HI', 'color: firebrick')

fetch('https://dog.ceo/api/breeds/image/random/4')
.then(resp => resp.json())
.then(json => addDogImgs(json));

fetch('https://dog.ceo/api/breeds/list/all')
.then(resp => resp.json())
.then(json => addDogBreed(json.message));

document.querySelector('#breed-dropdown').addEventListener('change', e => filterBreeds(e))

function addDogImgs(dogImgs) {
    dogImgs.message.forEach(dog => {
        const img = document.createElement('img');
        img.src = dog;
        document.querySelector('#dog-image-container').appendChild(img);
    });
}

function addDogBreed(dogBreeds) {
    for (const dog in dogBreeds) {
        appendDogBreed(dog);
        if (dogBreeds[dog].length !== 0) {
            const ul = document.createElement('ul');
            document.querySelector('#dog-breeds').appendChild(ul);
            dogBreeds[dog].forEach(type => appendDogBreed(type, ul, dog))
        } 
    }
}

function appendDogBreed(dog, parent = document.querySelector('#dog-breeds') , classN = 'breed') {
    const li = document.createElement('li');
    li.textContent = dog;
    li.classList.add(classN);
    li.addEventListener('click', e => {
        li.style.color = 'blue';
    })
    parent.appendChild(li);
}

function filterBreeds(e) {
    const dogs = document.querySelectorAll('.breed');
    dogs.forEach(dog => {
        if (dog.textContent[0] !== e.target.value) {
            document.querySelectorAll(`.${dog.textContent}`).forEach(element => element.style.display = 'none');
            dog.style.display = 'none';
        }
    })
}