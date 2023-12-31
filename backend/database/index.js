var mysql = require('mysql');

// DEV
var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database: "bodega"
});

// PROD
// var connection = mysql.createConnection({
//     host     : "",
//     user     : "",
//     password : "",
//     database: "",
// });



connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
});

const columnNames = "id, punto_atencion_id, ano, mes, tipo, prestador, departamento, municipio, punto, total_personas_inscritas, total_personas_inscritas_hombres, total_personas_inscritas_mujeres, total_personas_inscritas_jovenes, total_personas_inscritas_mujeres_jovenes, total_personas_inscritas_hombres_jovenes, personas_inscritas_mujeres_victimas, personas_inscritas_hombres_jovenes, personas_inscritas_mujeres_jovenes, total_personas_inscritas_PcD, total_personas_inscritas_mujeres_PcD, total_personas_inscritas_hombres_PcD, total_personas_inscritas_Victimas, total_personas_inscritas_mujeres_victimas, total_personas_inscritas_hombres_victimas, remisiones_a_empleadores_total, remisiones_a_empleadores_hombres, remisiones_a_empleadores_mujeres, remisiones_a_empleadores_hombres_victimas, remisiones_a_empleadores_mujeres_victimas, remisiones_a_empleadores_hombres_jovenes, remisiones_a_empleadores_mujeres_jovenes, remisiones_a_empleadores_hombres_PcD, remisiones_a_empleadores_mujeres_PcD, remisiones_a_empleadores_hombres_Migrantes, remisiones_a_empleadores_mujeres_Migrantes, remisiones_a_empleadores_hombres_Grupo, remisiones_a_empleadores_mujeres_Grupo, colocados_total, colocados_hombres, colocados_mujeres, colocados_hombres_victimas, colocados_mujeres_victimas, colocados_hombres_jovenes, colocados_mujeres_jovenes, colocados_hombres_PcD, colocados_mujeres_PcD, colocados_hombres_Migrantes, colocados_mujeres_Migrantes, colocados_hombres_Grupo, colocados_mujeres_Grupo, empleadores_inscritos_total, vacantes_registradas_total, vacantes_registradas_contrato_laboral, vacantes_registradas_prestacion, remitidas_gestion_empleo_total, remitidas_entrevista_orientacion, remitidas_talleres_orientacion, personas_atendidas, personas_atendidas_hombres, personas_atendidas_mujeres, personas_atendidas_hombres_victimas, personas_atendidas_mujeres_victimas, personas_atendidas_hombres_jovenes, personas_atendidas_mujeres_jovenes, personas_atendidas_hombres_PcD, personas_atendidas_mujeres_PcD, personas_atendidas_hombres_Migrantes, personas_atendidas_mujeres_Migrantes, personas_atendidas_hombres_Grupo, personas_atendidas_mujeres_Grupo, personas_atendidas_en_talleres, personas_atendidas_en_talleres_hombres, personas_atendidas_en_talleres_mujeres, personas_atendidas_en_talleres_hombres_victimas, personas_atendidas_en_talleres_mujeres_victimas, personas_atendidas_en_talleres_hombres_jovenes, personas_atendidas_en_talleres_mujeres_jovenes, personas_atendidas_en_talleres_hombres_PcD, personas_atendidas_en_talleres_mujeres_PcD, personas_atendidas_en_talleres_hombres_Migrantes, personas_atendidas_en_talleres_mujeres_Migrantes, personas_atendidas_en_talleres_hombres_Grupo, personas_atendidas_en_talleres_mujeres_Grupo, remitidas_formacion, remitidas_formacion_hombres, remitidas_formacion_competencias_hombres, remitidas_formacion_tic_hombres, remitidas_formacion_alfabetizacion_hombres, remitidas_formacion_entrenamiento_hombres, remitidas_formacion_tecnico_hombres, remitidas_formacion_mujeres, remitidas_formacion_competencias_mujeres, remitidas_formacion_tic_mujeres, remitidas_formacion_alfabetizacion_mujeres, remitidas_formacion_entrenamiento_mujeres, remitidas_formacion_tecnico_mujeres, culminaron_formacion, culminaron_formacion_hombres, culminaron_formacion_competencias_hombres, culminaron_formacion_tic_hombres, culminaron_formacion_alfabetizacion_hombres, culminaron_formacion_entrenamiento_hombres, culminaron_formacion_tecnico_hombres, culminaron_formacion_mujeres, culminaron_formacion_competencias_mujeres, culminaron_formacion_tic_mujeres, culminaron_formacion_alfabetizacion_mujeres, culminaron_formacion_entrenamiento_mujeres, culminaron_formacion_tecnico_mujeres, remitidas_talleres_emprendimiento, remitidas_servicios_complementarios, talleres_realizados, remitidas_programas_emprendimiento, remitidas_programas_emprendimiento_hombres, remitidas_programas_emprendimiento_mujeres, pqrs_radicados_total, personas_orientadas, colocados_40mil, transnacionales, hojas_vida_remitidas_exterior_total, hojas_vida_remitidas_exterior_hombres, hojas_vida_remitidas_exterior_mujeres, personas_colocadas_exterior_total, personas_colocadas_exterior_hombres, personas_colocadas_exterior_mujeres, empleadores_registrados_exterior, vacantes_registradas_exterior, observaciones, activo, created_at, updated_at, deleted_at, colocados_victimas, colocados_jovenes, colocados_discapacidad";


module.exports =  { connection, columnNames };