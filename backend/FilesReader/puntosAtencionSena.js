
const puntosDeAtencionSena =(idValue) => {
	let values = {
		57091:	11000013,
		57005:	11000024,
		57081:	11000001,
		57088:	11000039,
		57008:	11000005,
		57011:	11000006,
		57013:	11000009,
		57015:	11000043,
		57017:	11000014,
		57018:	11000011,
		57085:	11000046,
		57019:	11000034,
		57020:	11000044,
		57027:	11000036,
		57023:	11000026,
		57025:	11000081,
		57094:	11000035,
		57095:	11000040,
		57041:	11000028,
		57044:	11000037,
		57047:	11000041,
		57050:	11000045,
		57052:	11000029,
		57054:	11000010,
		57086:	11000091,
		57063:	11000002,
		57066:	11000030,
		57068:	11000007,
		57070:	11000042,
		57073:	11000012,
		57076:	11000008,
		57097:	11000025,
		57099:	11000038,
	}
	return values[idValue];
}

module.exports = { puntosDeAtencionSena };