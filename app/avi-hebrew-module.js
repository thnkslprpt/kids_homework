// Avi Hebrew module for space, satellite, and software vocabulary.
const AVI_HEBREW_MODULE_SOURCE = `
space	space	חָלָל
space	outer space	הֶחָלָל הַחִיצוֹן
space	vacuum	רִיק
space	microgravity	מִיקְרוֹ־כְּבִידָה
space	gravity	כְּבִידָה
space	radiation	קְרִינָה
space	solar radiation	קְרִינַת שֶׁמֶשׁ
space	charged particle	חֶלְקִיק טָעוּן
space	space weather	מֶזֶג אֲוִיר חָלָל
space	space debris	פְּסוֹלֶת חָלָל
space	satellite	לַוְיָן
space	artificial satellite	לַוְיָן מְלָאכוּתִי
space	spacecraft	חָלָלִית
space	space station	תַּחֲנַת חָלָל
space	space probe	גַּשּׁוֹשִׁית חָלָל
astronomy	planet	כּוֹכַב לֶכֶת
astronomy	star	כּוֹכָב
astronomy	Sun	שֶׁמֶשׁ
astronomy	Earth	כַּדּוּר הָאָרֶץ
astronomy	Moon	יָרֵחַ
astronomy	asteroid	אַסְטֵרוֹאִיד
astronomy	comet	שָׁבִיט
astronomy	galaxy	גָּלַקְסְיָה
astronomy	nebula	עֲרָפִילִית
astronomy	eclipse	לִיקּוּי
mission	mission	מְשִׂימָה
mission	payload	מִטְעָן יְעוּדִי
mission	platform	פְּלַטְפוֹרְמָה
mission	bus	מַעֲרֶכֶת נוֹשֵׂאת
mission	subsystem	תַּת־מַעֲרֶכֶת
mission	assembly	מִכְלוֹל
mission	subassembly	תַּת־מִכְלוֹל
mission	component	רְכִיב
mission	equipment	צִיּוּד
mission	unit	יְחִידָה
mission	module	מוֹדוּל
systems	interface	מִמְשָׁק
systems	requirement	דְּרִישָׁה
systems	system requirement	דְּרִישַׁת מַעֲרֶכֶת
systems	traceability	עֲקִיבוּת
systems	configuration	תְּצוּרָה
systems	parameter	פָּרָמֶטֶר
systems	version	גִּרְסָה
systems	release	שִׁחְרוּר
systems	patch	טְלַאי
systems	hotfix	תִּיקּוּן דָּחוּף
systems	repository	מַאֲגָר
systems	branch	עָנָף
systems	merge	מִיזּוּג
systems	build	בִּנְיָה
systems	build system	מַעֲרֶכֶת בִּנְיָה
systems	configuration file	קוֹבֶץ תְּצוּרָה
orbit	orbit	מַסְלוּל הַקָּפָה
orbit	trajectory	מַסְלוּל
orbit	launch	שִׁגּוּר
orbit	launcher	מַשְׁגֵּר
orbit	launch site	אֲתַר שִׁגּוּר
orbit	altitude	גֹּבַהַּ
orbit	inclination	נְטִיָּה
orbit	eccentricity	אֶקְסְצֶנְטְרִיּוּת
orbit	orbital period	תְּקוּפַת הַקָּפָה
orbit	sun-synchronous orbit	מַסְלוּל שִׁמְשִׁי־סִינְכְרוֹנִי
orbit	geostationary orbit	מַסְלוּל גֵּאוֹסְטַצְיוֹנָרִי
orbit	geosynchronous orbit	מַסְלוּל גֵּאוֹסִינְכְרוֹנִי
orbit	low Earth orbit	מַסְלוּל נָמוּךְ סְבִיב כַּדּוּר הָאָרֶץ
orbit	medium Earth orbit	מַסְלוּל בֵּינוֹנִי סְבִיב כַּדּוּר הָאָרֶץ
orbit	transfer orbit	מַסְלוּל הַעֲבָרָה
orbit	reentry	כְּנִיסָה מֵחָדָשׁ
orbit	separation	הִיפָּרְדוּת
orbit	deployment	פְּרִיסָה
orbit	collision avoidance	הִימָּנְעוּת מִתַּנְגְּשׁוּת
orbit	maneuver	תִּמְרוּן
orbit	burn	בְּעֵרָה
orbit	station keeping	שְׁמִירַת מָקוֹם
orbit	eclipse season	עוֹנַת לִיקּוּיִים
orbit	pointing	כִּוּוּן
orbit	pointing accuracy	דִּיּוּק כִּוּוּן
spacecraft_hardware	structure	מִבְנֶה
spacecraft_hardware	frame	שִׁלְדָּה
spacecraft_hardware	panel	לוּחַ
power	solar panel	לוּחַ סוֹלָרִי
power	solar array	מַעֲרָךְ סוֹלָרִי
power	battery	סוֹלְלָה
power	cell	תָּא
power	power system	מַעֲרֶכֶת הַסְפָּקַת כּוֹחַ
power	power supply	סַפָּק כּוֹחַ
power	power distribution unit	יְחִידַת חֲלוּקַת כּוֹחַ
power	voltage	מֶתַח
power	current	זֶרֶם
power	power	הֶסְפֵּק
power	energy	אֵנֶרְגְּיָה
power	grounding	הֶאֱרָקָה
spacecraft_hardware	harness	צַמֶּת כַּבָּלִים
spacecraft_hardware	connector	מְחַבֵּר
spacecraft_hardware	pin	פִּין
power	fuse	נָתִיךְ
spacecraft_hardware	switch	מַפְּסֵק
spacecraft_hardware	relay	מַמְסֵר
thermal	heater	מְחַמֵּם
thermal	thermostat	תֶּרְמוֹסְטָט
thermal	radiator	רַדְיָטוֹר
thermal	heat sink	גּוּף קִירוּר
thermal	thermal blanket	שְׂמִיכַת בִּדּוּד תֶּרְמִית
thermal	multi-layer insulation	בִּדּוּד רַב־שִׁכְבוֹת
thermal	heat pipe	צִנּוֹר חֹם
thermal	temperature sensor	חַיַּשׁ טֶמְפֶּרָטוּרָה
propulsion	propulsion	הֲנָעָה
propulsion	tank	מִכְל
propulsion	valve	שַׁסָּת
propulsion	line	צַנֶּרֶת
propulsion	thruster	דּוֹחֵף
propulsion	nozzle	פִּיָּה
avionics	avionics	אַוְיוֹנִיקָה
avionics	on-board computer	מַחְשֵׁב עַל־הַלַּוְיָן
comms	telemetry	טֶלֶמֶטְרִיָּה
comms	telecommand	פְּקוּדָה מִרְחוֹק
comms	tracking	עִקּוּב
comms	antenna	אַנְטֶנָה
comms	transmitter	מַשְׁדֵּר
comms	receiver	מְקַלֵּט
comms	transceiver	מַקְמָשׁ
comms	modem	מוֹדֶם
comms	frequency	תֶּדֶר
comms	bandwidth	רוֹחַב פַּס
comms	carrier	גַּל נוֹשֵׂא
comms	signal	אוֹת
comms	noise	רַעַשׁ
comms	uplink	קֶשֶׁר עוֹלֶה
comms	downlink	קֶשֶׁר יוֹרֵד
comms	link budget	תַּקְצִיב קֶשֶׁר
comms	bit rate	קֶצֶב סִבִּים
comms	packet	חֲבִילַת נְתוּנִים
comms	frame	מִסְגֶּרֶת
comms	protocol	פְּרוֹטוֹקוֹל
comms	encryption	הַצְפָּנָה
comms	decryption	פִּעְנוּחַ
comms	checksum	סְכוּם בִּקֹּרֶת
comms	CRC	בִּקֹּרֶת יַתִּירָה מַחְזוֹרִית
ground_segment	ground station	תַּחֲנַת קַרְקַע
ground_segment	mission control	בַּקָּרַת מִשִׂימָה
ground_segment	operations center	מֶרְכַּז תִּפְעוּל
ground_segment	pass	מַעֲבָר
ground_segment	contact window	חַלּוֹן תִּקְשֹׁרֶת
ground_segment	handover	הַעֲבָרַת קֶשֶׁר
adcs	attitude	יַחַס
adcs	attitude determination	קְבִיעַת יַחַס
adcs	attitude control	בַּקָּרַת יַחַס
gnc	guidance	הַנְחָיָה
gnc	navigation	נִוּוּט
gnc	control	בַּקָּרָה
gnc	guidance, navigation and control	הַנְחָיָה, נִוּוּט וּבַקָּרָה
adcs	reaction wheel	גַּלְגַּל תְּגוּבָה
adcs	magnetorquer	מַגְנֵטוֹרְקֶר
adcs	gyroscope	גִּ'ירוֹסְקוֹפּ
adcs	accelerometer	מַד תְּאוּצָה
adcs	magnetometer	מַגְנֵטוֹמֶטֶר
adcs	star tracker	עוֹקֵב כּוֹכָבִים
adcs	sun sensor	חַיַּשׁ שֶׁמֶשׁ
adcs	GPS receiver	מְקַלֵּט גִּ'י־פִּי־אֶס
adcs	inertial measurement unit	יְחִידַת מְדִידָה אִינֶרְצְיָאלִית
adcs	stability	יַצִּיבוּת
adcs	estimator	אוֹמֵד
adcs	filter	מַסְנֵן
adcs	Kalman filter	מַסְנֵן קַלְמָן
adcs	sensor fusion	מִזּוּג חַיָּשִׁים
adcs	control loop	לוּלְאַת בַּקָּרָה
adcs	actuator	מַפְעִיל
adcs	torque	מוֹמֶנְט פִּיתּוּל
adcs	angular velocity	מְהִירוּת זָוִיתִית
adcs	quaternion	קְוָטֶרְנְיוֹן
adcs	frame of reference	מַסְגֶּרֶת יִחוּס
adcs	body frame	מַסְגֶּרֶת הַגּוּף
adcs	inertial frame	מַסְגֶּרֶת אִינֶרְצְיָאלִית
software	software	תָּכְנָה
software	software (variant)	תּוֹכְנָה
software	hardware	חוֹמְרָה
software	firmware	קָשְׁחָה
software	embedded system	מַעֲרֶכֶת מוּטְמֶעַת
software	real-time system	מַעֲרֶכֶת זְמַן־אֱמֶת
software	operating system	מַעֲרֶכֶת הַפְעָלָה
software	real-time operating system	מַעֲרֶכֶת הַפְעָלָה לִזְמַן־אֱמֶת
software	scheduler	מְתַזְמֵן
software	task	מְשִׂימָה
software	process	תַּהֲלִיךְ
software	thread	תַּהֲלִיךְ קַל
software	interrupt	פְּסִיקָה
software	interrupt service routine	שִׁגְרַת שֵׁרוּת פְּסִיקָה
software	device	הֶתְקֵן
software	device driver	מַנְהֵל הֶתְקֵן
software	watchdog	מַשְׁגִּיחַ
software	watchdog timer	שָׁעוֹן מַשְׁגִּיחַ
software	bootloader	טוֹעֵן אִתְחוּל
software	startup	הַעֲלָאָה
software	initialization	אִתְחוּל
software	reset	אִפְסוּס
software	cold start	הַתְחָלָה קָרָה
software	warm start	הַתְחָלָה חַמָּה
software	state machine	מְכוֹנַת מַצָּבִים
software	deterministic	דֶּטֶרְמִינִיסְטִי
software	hard real-time	זְמַן־אֱמֶת קָשֶׁה
software	soft real-time	זְמַן־אֱמֶת רַךְ
software	latency	הַשְׁהָיָה
software	throughput	תְּפוּקָה
software	jitter	גִּ'יטֶר
software	timeout	פְּקִיעַת זְמַן
software	stack	מַעֲרֵמָה
software	heap	עֲרֵמָה
software	memory	זִכָּרוֹן
software	memory map	מַפַּת זִכָּרוֹן
software	RAM	זִכָּרוֹן גִּישָׁה אַקְרָאִית
software	ROM	זִכָּרוֹן לִקְרִיאָה בִּלְבַד
software	flash memory	זִכָּרוֹן פְלֶאשׁ
software	EEPROM	זִכָּרוֹן אִיפְּרוֹם
software	non-volatile memory	זִכָּרוֹן בִּלְתִּי נָדִיף
software	volatile memory	זִכָּרוֹן נָדִיף
software	register	אוֹגֵר
software	buffer	חוֹצֵץ
software	queue	תּוֹר
software	message queue	תּוֹר הוֹדָעוֹת
software	mutex	נְעוּלָה הֲדָדִית
software	semaphore	סֵמָפוֹר
software	deadlock	קִפָּאוֹן הֲדָדִי
software	race condition	מַצַּב מֵרוֹץ
software	overflow	גְּלִישָׁה
software	fault	תַּקָּלָה
software	failure	כֶּשֶׁל
software	fault detection	גִּילּוּי תַּקָּלוֹת
software	fault isolation	בִּידּוּד תַּקָּלָה
software	recovery	הִתְאוֹשְׁשׁוּת
software	safe mode	מַצָּב בָּטוּחַ
software	redundancy	יִתּוּר
software	redundant	יִתּוּרִי
software	heartbeat	דּוֹפֶק
software	health check	בְּדִיקַת תִּקִּינוּת
software	debugging	נִפּוּי
software	breakpoint	נְקוּדַּת עֲצִירָה
software	log	יוֹמָן
software	logger	רוֹשֵׁם
software	event	אֵירוּעַ
software	alert	הַתְרָעָה
software	telemetry packet	חֲבִילַת טֶלֶמֶטְרִיָּה
software	command packet	חֲבִילַת פְּקוּדוֹת
software	parser	מְפָרֵשׁ
software	decoder	מְפַעְנֵחַ
software	encoder	מְקַדֵּד
software	compression	דְּחִיסָה
software	compiler	מְהַדֵּר
software	linker	מְקַשֵּׁר
software	loader	טוֹעֵן
software	API	מִמְשַׁק תִּכְנוּת יִשּׂוּמִים
embedded_hw	processor	מְעַבֵּד
embedded_hw	CPU	יְחִידַת עִיבּוּד מֶרְכָּזִית
embedded_hw	microcontroller	מִיקְרוֹ־בַּקָּר
embedded_hw	FPGA	מַעֲרַךְ שַׁעֲרִים בַּר־תִּכְנוּת
embedded_hw	bus	אֶפְנָן
embedded_hw	SPI	מִמְשַׁק הֶקֵּפִי טוּרִי
embedded_hw	I2C	מִמְשַׁק בֵּין־מְעוֹגָלִים
embedded_hw	UART	מַשְׁדֵּר־מְקַלֵּט אַ־סִינְכְרוֹנִי כּוֹלֵל
embedded_hw	CAN bus	אֶפְנָן CAN
embedded_hw	RS-422	מִמְשָׁק RS-422
embedded_hw	Ethernet	אֶתֶרְנֶט
embedded_hw	serial interface	מִמְשָׁק טוּרִי
embedded_hw	parallel interface	מִמְשָׁק מַקְבִּילִי
embedded_hw	sampling	דְּגִימָה
embedded_hw	sample rate	קֶצֶב דְּגִימָה
test	verification	אִימוּת
test	validation	תִּקּוּף
test	simulation	הַדְמָיָה
test	simulator	מַדְמֶה
test	model	דֶּגֶם
test	unit test	בְּדִיקַת יְחִידָה
test	integration test	בְּדִיקַת אִינְטֶגְרַצְיָה
test	system test	בְּדִיקַת מַעֲרֶכֶת
test	acceptance test	בְּדִיקַת קַבָּלָה
test	qualification test	בְּדִיקַת הַסְמָכָה
test	environmental test	בְּדִיקָה סְבִיבָתִית
test	vibration test	בְּדִיקַת רְעִידָה
test	thermal vacuum test	בְּדִיקַת רִיק תֶּרְמִי
test	EMC	תְּאִימוּת אֶלֶקְטְרוֹמַגְנֶטִית
test	interface test	בְּדִיקַת מִמְשָׁק
test	hardware in the loop	חָמְרָה בַּלּוּלְאָה
test	software in the loop	תָּכְנָה בַּלּוּלְאָה
test	regression test	בְּדִיקַת נְסִיגָה
test	anomaly	חֲרִיגָה
test	nonconformance	אִי־הֲתָאָמָה
`.trim();

const AVI_HEBREW_MODULE = {
  words: AVI_HEBREW_MODULE_SOURCE.split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [category, english, hebrew] = line.split("\t");
      return {
        category,
        english,
        transliteration: "",
        hebrew,
        difficulty: 10,
      };
    }),
};
