const galleryWrapper = $('#gallery');


function setCards(cards) {

    let activeTag = $('.gallery-tags').find('li.active').data("tag");
    let filteredCards = cards.filter(card =>
        card.tags.includes("hide") ? null : card.tags.includes(activeTag)
    )

    console.log(filteredCards)
    galleryWrapper.empty();

    filteredCards.forEach(card => {
        let tags = card.tags.map(tag => "tag-" + tag).join(' ');
        let layout = "col-12";

        if (galleryWrapper.attr("data-layout") === "grid") {
            layout = "col-6 col-lg-4 col-xl-6"
        }

        let html = `
        <div class="${layout} card border-light card-custom my-3 ${tags}">
            <img
                    alt="Photo by ${card.author} on Unsplash"
                    class="card-img-top h-100"
                    src="assets/img/card/${card.img}"
            />
            <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.description}</p>
                <small>${card.tags.slice(1).join(' | ')}</small>
            </div>
        </div>
        `

        galleryWrapper.append(html);
    })
}

function changeLayout(layout) {
    if (galleryWrapper.attr("data-layout") === layout) return;
    galleryWrapper.attr("data-layout", layout)
    setCards(cards);
}

$(".mosaique-col").click(() => {
    changeLayout("columns");
});

$(".mosaique-grid").click(() => {
    changeLayout("grid");
});


$('.gallery-tags li').on('click', (e) => {
    e.stopPropagation();

    $('.gallery-tags').find('li.active').removeClass("active");
    e.target.classList.add("active");

    setCards(cards);
})

$(document).ready(() => {
    setCards(cards);
});
