document.addEventListener('DOMContentLoaded', () => {
    // Trending filter
    const trending = document.querySelector('.trending');
    if (trending) {
        trending.addEventListener('click', () => {
            console.log('Trending filter clicked!');
            window.location.href = '/listings/trending'; 
        });
    }
})

document.addEventListener('DOMContentLoaded', () => {
    //Rooms filter
    const rooms = document.querySelector('.rooms');
    if (rooms) {
        rooms.addEventListener('click', () => {
            console.log('Rooms filter was clicked!');
            window.location.href = './listings/rooms';
        });
    }
})

document.addEventListener('DOMContentLoaded', () => {
    //Cities filter
    const cities = document.querySelector('.cities')
        if(cities) {
            cities.addEventListener('click', () => {
                console.log("cities filter was clicked!");
                window.location.href = './listings/cities';
            })
        }
})

document.addEventListener('DOMContentLoaded', () => {
    //Mountain filter
    const mountain = document.querySelector('.mountain')
        if(mountain) {
            mountain.addEventListener('click', () => {
                console.log("mountain filter was clicked!");
                window.location.href = './listings/mountain';
            })
        }
})

document.addEventListener('DOMContentLoaded', () => {
    //Castles filter
    const castles = document.querySelector('.castles')
        if(castles) {
            castles.addEventListener('click', () => {
                console.log("castles filter was clicked!");
                window.location.href = './listings/castles';
            })
        }
    
})

document.addEventListener('DOMContentLoaded', () => {
    //Pools filter
    const pools = document.querySelector('.pools')
        if(pools) {
            pools.addEventListener('click', () => {
                console.log("pools filter was clicked!");
                window.location.href = './listings/pools';
            })
        }
})

document.addEventListener('DOMContentLoaded', () => {
    //Camping filter
    const camping = document.querySelector('.camping')
        if(camping) {
            camping.addEventListener('click', () => {
                console.log("camping filter was clicked!");
                window.location.href = './listings/camping';
            })
        }
})

document.addEventListener('DOMContentLoaded', () => {
    //Farms filter
    const farms = document.querySelector('.farms')
        if(farms) {
            farms.addEventListener('click', () => {
                console.log("farms filter was clicked!");
                window.location.href = './listings/farms';
            })
        }
})

document.addEventListener('DOMContentLoaded', () => {
    //arctic filter
    const arctic = document.querySelector('.arctic')
        if(arctic) {
           arctic.addEventListener('click', () => {
                console.log("arctic filter was clicked!");
                window.location.href = './listings/arctic';
            })
        }
})

document.addEventListener('DOMContentLoaded', () => {
    //bed&breakfasts filter
    const breakfasts = document.querySelector('.breakfasts')
        if(breakfasts) {
           breakfasts.addEventListener('click', () => {
                console.log("breakfasts filter was clicked!");
                window.location.href = './listings/breakfasts';
            })
        }
})

document.addEventListener('DOMContentLoaded', () => {
    //boats filter
    const boats = document.querySelector('.boats')
        if(boats) {
           boats.addEventListener('click', () => {
                console.log("boats filter was clicked!");
                window.location.href = './listings/boats';
            })
        }
})

document.addEventListener('DOMContentLoaded', () => {
    //domes filter
    const domes = document.querySelector('.domes')
        if(domes) {
           domes.addEventListener('click', () => {
                console.log("domes filter was clicked!");
                window.location.href = './listings/domes';
            })
        }
})