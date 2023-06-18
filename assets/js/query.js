function loadDoctorsInfoQuery() {
    $.ajax({
        url: "../vendor/action/loadDoctorsInfoAction.php",
        method: "get",
        dataType: "json",
        success: function (response) {
            response["doctors"].map(function(doctor) {
                doctor.specialization = response["specializations"][doctor.specialization - 1].name;
                data["doctors"].push(doctor);
            });
            response["specializations"].map(function(specialization) {
                data["specializations"].push(specialization.name);
            });
            response["cards"].map(function(card) {
                let date = new Date(`${card.date} ${card.time}`);
                let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
                let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
                let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
                let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`; 
                card.date = `${day}.${month}.${date.getFullYear()}`;
                card.time = `${hours}:${minutes}`;
                card.doctor = response["doctors"][card.doctor - 1].full_name;
                data["cards"].push(card);
            });
            fillSpecializationSelect();
        }
    });
}

function doctorsAppointmentQuery() {
    $.ajax({
        url: "../vendor/action/doctorsAppointmentAction.php",
        method: "post",
        dataType: "json",
        data: {
            full_name: document.querySelector("#fullname").value,
            date: document.querySelector("#birthday").value,
            phone: document.querySelector("#phone").value,
            doctor: getDoctorId(selectedCard.doctor),
            card: selectedCard.id
        },
        success: function (response) {
            alert(response.response);
            if (response.response === "Вы успешно записались к врачу. С вами свяжутся в ближайшее время, ожидайте") {
                window.location.reload();
            }
        }
    });
}