/* =========================================
   FEATURED CARD SCROLL ANIMATION
========================================= */

const featuredCards = document.querySelectorAll(".reveal-card");

const cardObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show-card");

            }

        });

    },
    {
        threshold: 0.15
    }
);


featuredCards.forEach(function(card) {

    cardObserver.observe(card);

});

/* =========================================
   FACILITIES SCROLL ANIMATION
========================================= */

const facilityCards =
    document.querySelectorAll(".facility-card");


const facilityCardObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "facility-visible"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


facilityCards.forEach(function(card) {

    facilityCardObserver.observe(card);

});