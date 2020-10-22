var app = angular.module('myGame', []);
app.controller('myCtrl', function ($scope) {
    // Crear tablero start
    $scope.tablero_random = function () {
        $scope.tablero = new Array();
        var i = 100;
        var temp = 1;
        var boo = true;
        var clase = true;
        var randoms = Array.from({
            length: 20
        }, () => Math.round(Math.random() * (95 - 5) + parseInt(5)));
        console.log(randoms);
        while (i >= 1) {
            $scope.tablero.push({
                "id": (boo) ? i : i - 11 + (temp * 2),
                "clase": (boo) ? ((clase) ? 'even' : 'odd') : ((clase) ? 'odd' : 'even'),
                "evento": ""
            });
            clase = !clase;
            if (temp == 10) {
                boo = !boo;
                temp = 1;
            } else {
                temp++;
            }
            i--;
        }
        // Insertando eventos aleatorios
        randoms.forEach(function (element) {
            var i = $scope.tablero.findIndex(elemt => elemt.id == element);
            if (i != -1) {
                $scope.tablero[i].evento = "Potenciadores";
            }
        });
        console.log($scope.tablero);
    }
    $scope.potenciadores = function (id, datos) {
        var evento = Math.round(Math.random() * (8 - 1) + parseInt(1));
        switch (evento) {
            case 1:
                // El auto enemigo es aturdido quitandole 3 de vida y perdiendo 1 turno
                evento = "Rayo";
                break;
            case 2:
                // Deja una bomba en su posición quitandole 4 de vida 
                evento = "Mina";
                break;
            case 3:
                // Activa una onda expansiva de 3 posiciones adelante y atras quitando 3 de vida
                evento = "Onda";
                break;
            case 4:
                // Envia 3 bombas al auto enemigo quitandole 3 de vida
                evento = "Proyectil";
                break;
            case 5:
                // Envia 1 bomba al auto enemigo quitandole 4 de vida 
                evento = "Bomba";
                break;
            case 6:
                // Tu auto aumenta 5 posiciones
                evento = "Nitro";
                break;
            case 7:
                // Tu auto es protegido por el siguiente ataque de tu contrincante
                evento = "Escudo";
                break;
            case 8:
                // Tu auto se repara al 10 de vida
                evento = "Reparar";
                break;
            default:
                evento = "";
                break;
        }
        $scope["jugador_" + datos].car_add_potenciador = evento;
    }
    $scope.ejecutar = function (id, pj, potenciador) {
        if (pj.car_turno) {
            console.log($scope.jugador_1, $scope.jugador_2);
            switch (potenciador) {
                case "Rayo":
                    // El auto enemigo es aturdido quitandole 3 de vida y perdiendo 1 turno
                    $scope["jugador_" + ((id.replace("ficha_", "") == 1) ? 2 : 1)].car_vida -= 3;
                    break;
                case "Mina":
                    // Deja una bomba en su posición quitandole 4 de vida 

                    break;
                case "Onda":
                    // Activa una onda expansiva de 3 posiciones adelante y atras quitando 3 de vida

                    break;
                case "Proyectil":
                    // Envia 3 bombas al auto enemigo quitandole 3 de vida
                    $scope["jugador_" + ((id.replace("ficha_", "") == 1) ? 2 : 1)].car_vida -= 3;
                    break;
                case "Bomba":
                    // Envia 1 bomba al auto enemigo quitandole 4 de vida 
                    $scope["jugador_" + ((id.replace("ficha_", "") == 1) ? 2 : 1)].car_vida -= 4;
                    break;
                case "Nitro":
                    // Tu auto aumenta 5 posiciones
                    var cuadro = document.querySelector("#cuadro_" + (pj.car_posicion + 2)).getBoundingClientRect();
                    enviar_coordenadas("#" + id, "#cuadro_" + (pj.car_posicion + 2), cuadro.left, cuadro.top);
                    pj.car_posicion = (pj.car_posicion + 2);
                    // $scope["jugador_" + pj].car_turno = false;
                    // $scope["jugador_" + ((pj == 1) ? 2 : 1)].car_turno = true;
                    // $scope.valor_dado = $scope.dados(1, 6);
                    var i = $scope.tablero.findIndex(elemt => elemt.id == (pj.car_posicion + 2));
                    if ($scope.tablero[i].evento != "") {
                        $scope.potenciadores($scope.ficha_seleccionada, id.replace("ficha_", ""));
                    }
                    break;
                case "Escudo":
                    // Tu auto es protegido por el siguiente ataque de tu contrincante

                    break;
                case "Reparar":
                    // Tu auto se repara al 10 de vida
                    $scope["jugador_" + id.replace("ficha_", "")].car_vida = 10;
                    break;
                default:

                    break;
            }
            debugger;
            $scope["jugador_" + id.replace("ficha_", "")].car_delete_potenciador = potenciador;
            console.log($scope.jugador_1, $scope.jugador_2);
        } else {
            Swal.fire({
                title: 'Mensaje',
                text: 'No es tu turno para usar este potenciador',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                type: 'warning'
            })
        }
    }
    $scope.tablero_random();
    // Crear tablero end
    $scope.ficha_seleccionada = "";
    $scope.seleccionar_ficha = function (id) {
        $scope.ficha_seleccionada = id;
    }

    function enviar_coordenadas(element, element_2, x_pos, y_pos) {
        let ficha = document.querySelector(element);
        let cuadro = document.querySelector(element_2);
        ficha.style.position = "absolute";
        ficha.style.left = (x_pos + (parseFloat(getComputedStyle(cuadro).width) / 2) - (parseFloat(getComputedStyle(ficha).width) / 2)) + 'px';
        // Cambiar top dependiendo del auto
        if (element == "#ficha_1") {
            ficha.style.top = (y_pos + (parseFloat(getComputedStyle(cuadro).height) / 2) - (parseFloat(getComputedStyle(ficha).height) / 2) - (parseFloat(getComputedStyle(ficha).height) / 3)) + 'px';
        } else {
            ficha.style.top = (y_pos + (parseFloat(getComputedStyle(cuadro).height) / 2) - (parseFloat(getComputedStyle(ficha).height) / 2) + (parseFloat(getComputedStyle(ficha).height) / 3)) + 'px';
        }
        // Rotar auto dependiendo la direccion
        var po = parseInt(element_2.replace("#cuadro_", ""));
        if ((po >= 11 && po <= 20) || (po >= 31 && po <= 40) || (po >= 51 && po <= 60) || (po >= 71 && po <= 80) || (po >= 91 && po <= 100)) {
            ficha.style.transform = "rotateY(180deg)";
        } else {
            ficha.style.transform = "";
        }
        $scope.ficha_seleccionada = "";
    }
    $scope.mover_ficha = function (id) {
        if ($scope.ficha_seleccionada != "") {
            var pj = $scope.ficha_seleccionada.replace("ficha_", "");
            if ($scope["jugador_" + pj].car_turno) {
                if (id <= ($scope["jugador_" + pj].car_posicion + $scope.valor_dado) && id > $scope["jugador_" + pj].car_posicion) {
                    var cuadro = document.querySelector("#cuadro_" + id).getBoundingClientRect();
                    enviar_coordenadas("#" + $scope.ficha_seleccionada, "#cuadro_" + id, cuadro.left, cuadro.top);
                    $scope["jugador_" + pj].car_posicion = id;
                    $scope["jugador_" + pj].car_turno = false;
                    $scope["jugador_" + ((pj == 1) ? 2 : 1)].car_turno = true;
                    $scope.valor_dado = $scope.dados(1, 6);
                    var i = $scope.tablero.findIndex(elemt => elemt.id == id);
                    if ($scope.tablero[i].evento != "") {
                        $scope.potenciadores($scope.ficha_seleccionada, pj);
                    }
                } else {
                    Swal.fire({
                        title: 'Mensaje',
                        text: 'No es una posicion valida',
                        confirmButtonText: 'Aceptar',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        type: 'warning'
                    })
                }
            } else {
                Swal.fire({
                    title: 'Mensaje',
                    text: 'No es tu turno',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    type: 'warning'
                })
                $scope.ficha_seleccionada = "";
            }
        } else {
            Swal.fire({
                title: 'Mensaje',
                text: 'Seleccione un Auto',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                type: 'warning'
            })
        }
    }
    // Creando la clase Car
    class Car {
        constructor(nombre) {
            this.conductor = nombre;
            this.posicion = 1;
            this.potenciadores = new Array();
            this.vida = 10;
            this.turno = false;
        }
        get car_conductor() {
            return this.conductor;
        }
        set car_conductor(x) {
            this.conductor = x;
        }
        get car_posicion() {
            return this.posicion;
        }
        set car_posicion(x) {
            this.posicion = x;
        }
        get car_potenciadores() {
            return this.potenciadores;
        }
        set car_add_potenciador(x) {
            if (this.potenciadores.length <= 3) {
                this.potenciadores.push(x);
            } else {
                Swal.fire({
                    title: 'Mensaje',
                    text: 'Solo puedes tener 3 potenciadores',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    type: 'warning'
                })
            }
        }
        set car_delete_potenciador(x) {
            var i = this.potenciadores.findIndex(elemt => elemt == x);
            if (i != -1) {
                this.potenciadores.slice(1, i);
            }
        }
        set car_vida(x) {
            this.vida = x;
        }
        get car_vida() {
            return this.vida;
        }
        set car_turno(x) {
            this.turno = x;
        }
        get car_turno() {
            return this.turno;
        }
    }
    $scope.dados = function (inicial, final) {
        return Math.round(Math.random() * (final - inicial) + parseInt(inicial));
    }
    $scope.valor_dado = $scope.dados(1, 6);
    $scope.turno = "";
    $scope.jugador_1 = new Car("");
    $scope.jugador_2 = new Car("");
    $scope.iniciar_carrera = function (tipo) {
        if (tipo) {
            $scope.jugador_1 = new Car(result.value[0]);
            $scope.jugador_2 = new Car("IA");
        } else {
            Swal.mixin({
                input: 'text',
                confirmButtonText: 'Siguiente &rarr;',
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                progressSteps: ['1', '2']
            }).queue([{
                    title: 'Registro',
                    text: 'Nombre del conductor 1'
                },
                {
                    title: 'Registro',
                    text: 'Nombre del conductor 2'
                }
            ]).then((result) => {
                if (result.value && result.value[0] != "" && result.value[1] != "") {
                    var random_player = $scope.dados(0, 1);
                    Swal.fire({
                        title: 'Muy bien corredores!',
                        html: 'Inicia el jugador: <strong>' + result.value[random_player] + '</strong> con el auto rojo',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonText: 'Listo!'
                    })
                    $scope.jugador_1.car_conductor = result.value[random_player];
                    $scope.jugador_1.car_turno = true;
                    $scope.jugador_2.car_conductor = result.value[(random_player == 0) ? 1 : 0];
                    $scope.tablero_random();
                    $scope.$apply();
                } else {
                    $scope.iniciar_carrera(tipo);
                }
            })
        }
    }
    $scope.menu = function () {
        Swal.fire({
            title: 'Bienvenido a Blur 2D\nby Cesar Nuñez',
            background: "#090b06",
            backdrop: "#090b06",
            text: "Seleccionar un modo de juego:",
            imageUrl: 'blur.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#00246a',
            cancelButtonColor: '#00246a',
            cancelButtonText: 'Multiplayer',
            confirmButtonText: 'Single Player',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((result) => {
            // Single Player = true;
            // Multiplayer = false;
            document.getElementById('sound').play();
            $scope.iniciar_carrera(result.value);
        })
    }
    $scope.menu();
});