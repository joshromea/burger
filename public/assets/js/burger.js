$(function () {
    $('.change-devoured').on('click', (event) => {

        let id = event.target.id;
        console.log(id);
        let newDevoured = $(this).data('newdevoured')
        let newDevouredState = {
            devoured: newDevoured
        }

        let url = "/api/burgers/" + id
        let data = newDevouredState

        console.log(url)

        //Sending PUT request with AJAX//
        $.ajax(url, {
            type: 'PUT',
            data,
        }).then(() => {
            console.log(`Change Not Devoured to ${newDevoured}`)
            location.reload();
        })
    })


    //Create new Burger function//
    $('.create-burger').on('submit', (event) => {
        event.preventDefault()

        const newBurger = {
            burger_name: $('#burg').val().trim(),
            devoured: 0
        }

        console.log(newBurger)

        $.ajax(`/api/burgers`, {
            type: 'POST',
            data: newBurger
        }).then(() => {
            console.log(`New Burger Created`)
            location.reload();
        })
    })
})