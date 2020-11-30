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

$('.style-label').each(function(index, value) {
    $(value).on('click', function(e) {
        $('.selected').each(function(index, value) {
            $(value).next().prop('checked', false)
            $(value).removeClass('selected')
        })
        $(e.target).addClass('selected')
    })
})

$('.chibi-color-label').each(function(index, value) {
    $(value).on('click', function(e) {
        $('.chibi-color-label').each(function(index, value) {

            if ($(value).hasClass('selected')) {
                $(value).removeClass('selected')
            }
        })
        $(e.target).addClass('selected')
    })
})

$('.size-label').each(function(index, value) {
    $(value).on('click', function(e) {
        $('.size-label').each(function(index, value) {

            if ($(value).hasClass('selected')) {
                $(value).removeClass('selected')
            }

            $(value).siblings('div').children().each(function(index, value) {
                if($(value)[0].checked == true) {
                    $(value).prop('checked', false)
                }

                if($(value).hasClass('selected')) {
                    $(value).removeClass('selected')
                }
                
            })
            
        
        })
        
        $(e.target).addClass('selected')
    })
})

$('.standard-color-label').each(function(index, value) {
    $(value).on('click', function(e) {
        $('.standard-color-label').each(function(index, value) {

            if ($(value).hasClass('selected')) {
                $(value).removeClass('selected')
            }
        })
        $(e.target).addClass('selected')
    })
})




        
 





