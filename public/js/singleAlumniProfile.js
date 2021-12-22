document.querySelector("#home-tab").addEventListener('click', () => {
    document.querySelector("#home-tab").classList.add('active') ;
    document.querySelector("#profile-tab").classList.remove('active') ;
    document.querySelector("#home").classList.add('show') ;
    document.querySelector("#home").classList.add('active') ;
    document.querySelector("#profile").classList.remove('active') ;
    document.querySelector("#profile").classList.remove('show') ;
})


document.querySelector("#profile-tab").addEventListener('click', () => {
    document.querySelector("#profile-tab").classList.add('active') ;
    document.querySelector("#home-tab").classList.remove('active') ;
    document.querySelector("#profile").classList.add('show') ;
    document.querySelector("#profile").classList.add('active') ;
    document.querySelector("#home").classList.remove('active') ;
    document.querySelector("#home").classList.remove('show') ;
})