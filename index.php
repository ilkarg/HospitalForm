<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Calendar</title>
        <!--CSS-->
		    <link rel="stylesheet" href="assets/css/style.css" type="text/css">
		    <!--Animate-->
		    <link rel="stylesheet" href="assets/css/animate.min.css">
		    <!--Bootstrap CSS-->
		    <link href="assets/css/bootstrap.min.css" rel="stylesheet" >
    </head>
    <body>
        <div class="calendar">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="feedback-form row needs-validation">
                            <div class="title-block">
                                <h1 class="text-start">Записаться на приём к врачу</h1>
                            </div>
                            <div class="col-12">
                                <label for="validationCustom01" class="form-label">Выберите специализацию</label>
                                <select id="select-specialization" onchange="loadDoctorsBySpecialization()" class="form-select" aria-label="Выберите специализацию">
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="validationCustom02" class="form-label">Выберите врача</label>
                                <select id="select-doctor" class="form-select" aria-label="Выберите врача">
                                </select>
                            </div>
                            <div class="col-12">
                                <div class="calendar-header d-flex align-items-center justify-content-between w-100">
                                    <div class="month d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
                                        <span class="month-picker dropdown" id="month-picker"></span>
                                        <img src="assets/img/down.svg" alt="down">
                                    </div>
                                    <div class="year-picker d-flex align-items-center" id="year-picker">
                                        <span class="year-change" id="pre-year">
                                            <pre>&lt;</pre>
                                        </span>
                                        <span id="year">2020</span>
                                        <span class="year-change" id="next-year">
                                            <pre>&gt;</pre>
                                        </span>
                                    </div>
                                </div>

                                <div class="calendar-body">
                                    <div class="calendar-week-days row w-100 ms-auto me-auto">
                                        <div class="col text-start">ПН</div>
                                        <div class="col text-start">ВТ</div>
                                        <div class="col text-start">СР</div>
                                        <div class="col text-start">ЧТ</div>
                                        <div class="col text-start">ПТ</div>
                                        <div class="col text-start">СБ</div>
                                        <div class="col text-start">ВС</div>
                                    </div>
                                    <div class="calendar-days" id="calendar-days"></div>
                                </div>

                                <div class="calendar-footer d-flex align-items-center justify-content-end"></div>
                                <div class="month-list collapse" id="collapseExample"></div>

                            </div>

                            <div class="col-12 time">
                                <label for="validationCustom02" class="form-label d-block w-100">Выберите время</label>
                                <div id="time"></div>
                            </div>

                            <div class="hidden" id="form">
                                <div class="col-12">
                                    <label for="validationCustom01" class="form-label">Ваше ФИО</label>
                                    <input type="text" class="form-control" id="fullname" placeholder="Иван" required>
                                </div>
                                <div class="col-12">
                                    <label for="validationCustom02" class="form-label">Дата рождения</label>
                                    <input type="date" class="form-control" id="birthday" placeholder="Дата" required>
                                </div>
                                <div class="col-12">
                                    <label for="validationCustom02" class="form-label">Введите номер телефона</label>
                                    <input type="tel" class="form-control" id="phone" placeholder="Номер телефона" required>
                                </div>

                                <div class="col-12">
                                    <button class="btn w-100 text-uppercase" type="submit" onclick="doctorsAppointmentQuery()">Записаться на приём</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--JQuery link-->
        <script src="assets/js/jquery.js"></script>
        <!--Bootstrap JS-->
        <script src="assets/js/bootstrap.bundle.min.js"></script>
        <!--Script JS-->
        <script src="assets/js/script.js"></script>
        <!--Query JS-->
        <script src="assets/js/query.js"></script>
        <!--JS-->
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            loadDoctorsInfoQuery();
          });
        </script>
    </body>
</html>