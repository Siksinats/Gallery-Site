/*--Gallery Script--*/

/*--Read the folder where the gallery images are held, and apply them to the gallery page--*/
    var galleryFolder = "../Images/Gallery Images"; 
    $.ajax({
        url: galleryFolder,
        success: function(data) {
            $(data).find("a").attr("href", function(i, val) {
                if (val.includes('.png')) {
                    $(".gallery-body").append(`
                <div class="image-container">
                    <img src='${val}' data-aos="slide-up">
                </div>`);
                }
            }) 
            
            $(".gallery-body").find('img').addClass('gallery-img').on('click', function(e) {
                let source = e.target.src
                modal(source)
            })   
        }
    });
/*----------------------------------------------------------------------------------------*/

    
/*------Create modals when gallery items are clicked on and exit when clicked off of------*/
    function modal(source) {
        $('.modal-content').append(`<img class='modal-img small-img' src='${source}'>`)
        $('.modal').css({'display': 'flex'})
        $('body').css({'height': '100%', 'overflow-y': 'hidden'})
        $('.modal-img').on('click', function() {

            if($('.modal-img').hasClass('small-img')) {
                $('.modal-img').removeClass('small-img')
                $('.modal-img').addClass('large-img')
                $('.modal').css({'display': 'initial'})
            } else {
                $('.modal-img').removeClass('large-img')
                $('.modal-img').addClass('small-img')
                $('.modal').css({'display': 'flex'})
                
            }
            
        })
    }

    $(window).on('click', function(e) {
        if(e.target == $('.modal')[0]) {
            $('.modal-content').empty();
            $('.modal').css({'display': 'none'});
            $('body').css({'height': '100%', 'overflow-y': 'initial'})
        }
    })
/*----------------------------------------------------------------------------------------*/

/*--/Gallery Script--*/

/*--Comic Script--*/

let comicFolder = "../JSON/Comics.json"; 
let img = '../Images/Comics/'
let comicData = [];
$.ajax({
    url: comicFolder,
    success: function(data) {
        comicData = data.comics
        $(comicData).each(function(index, val) {
            $(".comic-list-wrapper").append(`
            <img id='${val.folder}' src='${img}${val.folder}/${val.folder}Cover.jpg'>`); 
        }) 

        $(".comic-list-wrapper").find('img').addClass('comic-img').on('click', function(e) {
            $('.blade-list').empty()
            populateBlade(e)
        })
    }
});

function populateBlade(e) {
    let id = $(e.target).attr('id')
    let comicIds = []
    let comicInfo = []

    $(comicData).each(function(index, val) {
         comicIds.push(val.folder) 
    })

    $(comicData).each(function(index, val) {
        if (val.folder.match(id) !== null) {
            comicInfo = val
            let titleImg = $(e.target)[0].src
            console.log(titleImg)
           $('.title-img').html(`<img src=${titleImg}>
           `)
           $('.title-txt').html(`
            ${comicInfo.name}`)
           

           var episodeFolder = `../Images/Comics/${comicInfo.folder}`
            $.ajax({
                url: episodeFolder,
                success: function(data) {
                    $(data).find(`a:contains(${comicInfo.name}_ep)`).attr("href", function(index) {
                        let bladeItem = `<li id='episode${index+1}' class='blade-item'>${comicInfo.name} Episode ${index + 1}</li>`
                        $(".blade-list").append(bladeItem);
                        $(`#episode${index+1}`).on('click', function() {
                            let source = `${episodeFolder}/${comicInfo.folder}_ep${index+1}.jpg`
                            modal(source)
                        })

                        
                    })   
                }
            });
        }
    
    })
    
    $('.comic-blade').removeClass('bladeOut').addClass('bladeIn')
}



$(window).on('click', function(e) {
    if ($(e.target).is($('.comic-blade'))) {

    } else if ($(e.target).is($('.comic-img'))) {

    } else if ($(e.target).is($('.blade-item'))) {

    } else if ($(e.target).is($('.modal'))) {

    } else if ($(e.target).is($('.modal-content'))) {

    } else if ($(e.target).is($('.modal-img'))) {

    } else {
        $('.comic-blade').removeClass('bladeIn').addClass('bladeOut')
    }
})




/*--/Comic Script--*/


   
/*--Commission Script--*/

/********************************************/
    /* Choose the style of the drawing*/
/********************************************/
$('.style-img').on('click', function(event) {
    $(event.target).parent().addClass('selected')
    $('.style-img').not('.selected').addClass('fast-shrink')


    /*---------------------------------------
        -Set style title to invisible
        -Move style container to selection area
        -Set not selected items to invisible
    -----------------------------------------*/
    setTimeout(function(){
        $('.style-title').animate({
            opacity: '0'
        }, )

        $('.style-container').animate({
            left: '47px',
            top: '40vh',
            width: '200px'
          }, 750);

        $('.fast-shrink').animate({
            width: '0px',
            opacity: '0'
        }, 500);
    },0);


    /*----------------------------------------
        -Set not selected items to no display
    -----------------------------------------*/
    setTimeout(function() {
        $('.fast-shrink').css('display', 'none')
    }, 850)

    
    /*-----------------------------------------
        -Set line items to visible
        -Set style title to have no display
        -Set height of line items
    ------------------------------------------*/
    setTimeout(function() {
        $('.line-title').css('display', 'block')
        $('.line-wrapper').css('display', 'flex')
        $('.line-container').css('display', 'flex')
        $('.style-title').css('display', 'none')
        $('.selected-item-shadow').css('display', 'initial')
        
        $('.line-wrapper').animate({
            height: '80%'
        },'slow')

        $('.line-container').animate({
            height: '400px'
        },'slow')
    },1000)
})
/********************************************/
    /* Choose the line work of the drawing*/
/********************************************/
$('.line-img').on('click', function(event) {
    $(event.target).parent().addClass('selected')
    $('.line-img').not('.selected').addClass('fast-shrink')

    /*---------------------------------------
        -Set line title to invisible
        -Move line container to selection area
        -Set not selected items to invisible
    -----------------------------------------*/
    setTimeout(function(){
        $('.selected-item-shadow').animate({
            opacity: '0'
        })

        $('.line-title').animate({
            opacity: '0'
        }, )

        $('.style-container').animate({
            opacity: '0'
        })

        $('.line-container').animate({
            left: '47px',
            top: '40vh',
            width: '200px'
          }, 750);

        $('.fast-shrink').animate({
            width: '0px',
            opacity: '0'
        }, 500);
    },0);

    /*----------------------------------------
        -Set not selected items to no display
    -----------------------------------------*/
    setTimeout(function() {
        $('.fast-shrink').css('display', 'none')
        $('.style-wrapper').css('display', 'none')
        $('.selected-item-shadow').css('display','none')
    }, 850)

    
    /*-----------------------------------------
        -Set color items to visible
        -Set line title to have no display
        -Set height of color items
    ------------------------------------------*/
    setTimeout(function() {

        $('.color-title').css('display', 'block')
        $('.color-wrapper').css('display', 'initial')
        $('.selected-item-shadow').css({
            display: 'initial',
            opacity: '100'})

        
        $('.line-title').css({
            height: '0px',
            margin: '0px'
        }, )
        
        $('.color-wrapper').animate({
            height: '400px'
        },'slow')

        $('.color-container').animate({
            height: '400px'
        },'slow')
    },1000)
})


/********************************************/
    /* Choose the coloring of the drawing*/
/********************************************/
$('.color-img').on('click', function(event) {
    $(event.target).parent().addClass('selected')
    $('.color-img').not('.selected').addClass('fast-shrink')

    /*---------------------------------------
        -Set color title to invisible
        -Move color container to selection area
        -Set not selected items to invisible
    -----------------------------------------*/
    setTimeout(function(){
        $('.selected-item-shadow').animate({
            opacity: '0'
        })
        
        $('.color-title').animate({
            opacity: '0'
        }, )

        $('.line-container').animate({
            opacity: '0'
        })

        $('.color-container').animate({
            left: '47px',
            top: '40vh',
            width: '200px'
          }, 750);

        $('.fast-shrink').animate({
            width: '0px',
            opacity: '0'
        }, 500);
    },0);

    /*----------------------------------------
        -Set not selected items to no display
    -----------------------------------------*/
    setTimeout(function() {
        $('.fast-shrink').css('display', 'none')
        $('.line-wrapper').css('display', 'none')
        $('.selected-item-shadow').css('display','none')
    }, 850)



    setTimeout(function() {
        $('.details-title').css('display', 'block')
       $('.form-wrapper').css('display', 'block')
       $('.selected-item-shadow').css({
        display: 'initial',
        opacity: '100'})
        
        $('.color-title').css({
            height: '0px',
            margin: '0px'
        }, )

        $('.form-wrapper').animate({
            height: '80vh'
        },'slow')


    },1000)

})
        
 





