const options = {
    menuOpen: false,
}

//Menu DOM
const menuButton = document.querySelector('.menu__button'),
    menuList = document.querySelector('.menu__list'),
    buttonTop = document.querySelector('.button__top'),
    buttonBot = document.querySelector('.button__bot')
    

menuButton.addEventListener('click', () => {

    options.menuOpen = !options.menuOpen
    if (options.menuOpen) {
        menuList.style.right = '0px'
        // menuList.style.opacity = '1'
        buttonTop.style.top = '0px'
        buttonBot.style.bottom = '0px'
       
    } else {
        menuList.style.right = '-600px'
        // menuList.style.opacity = '0'
        buttonTop.style.top = '9px'
        buttonBot.style.bottom = '9px'
        
    }
})


// Brands DOM

document.querySelectorAll('.brands-group__list').forEach(group => {
    let open = false
    

    group.addEventListener('click', event => {
        open = !open

        const targetGroup = event.target.closest(".brands-group__item")
        const targetBtn = targetGroup.querySelector(".brands-group__button")
        const arrow = targetBtn.querySelector('.button__arrow')
        
        if(open){
            targetGroup.style.left = `-${targetGroup.querySelector('.brands').clientWidth}px`
            arrow.style.transform = 'translate(-50%, -50%) rotateY(0deg)'
        }else{
            targetGroup.style.left = `0px`
            arrow.style.transform = 'translate(-50%, -50%) rotateY(180deg)'
        }
    })
})
