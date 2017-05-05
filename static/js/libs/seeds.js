function doAccountAddressFromPublicKey() {

	let base58AccountPublicKey = document.getElementById('base58AccountPublicKey').value;

	if(Base58.decode(base58AccountPublicKey).length != 32) {
		document.getElementById('base58AccountAddress').value = '';
		alert("invalid PublicKey!");
		return;
	}

	let base58AccountAddress = getAccountAddressFromPublicKey(base58AccountPublicKey);
	document.getElementById('base58AccountAddress').value = base58AccountAddress;
}
function doBrain()
{
	let brainWalletPassphrase = document.getElementById('brainWalletPassphrase').value;

	if(brainWalletPassphrase.length < 8) {
		document.getElementById('base58BaseSeed').value = '';
		document.getElementById('output').innerHTML = '';
		alert("invalid passphrase length!\nIt should be at least 8 characters.");
		return;
	}

	let byteSeed = new Uint8Array(SHA256.digest(SHA256.digest(brainWalletPassphrase)));
	let base58BaseSeed = Base58.encode(byteSeed);

	document.getElementById('base58BaseSeed').value = base58BaseSeed;

	doAccounts();
}

function doAccountFromSeed(base58AccountSeed)
{
	if(base58AccountSeed) {
		document.getElementById('base58AccountSeed').value = base58AccountSeed;
	} else {
		base58AccountSeed = document.getElementById('base58AccountSeed').value;
	}

	if(Base58.decode(base58AccountSeed).length != 32) {
		document.getElementById('base58AccountPublicKey').value = '';
		document.getElementById('base58AccountPrivateKey').value = '';
		document.getElementById('base58AccountAddress').value = '';
		alert("invalid seed!");
		return;
	}

	keyPair = getKeyPairFromSeed(base58AccountSeed, false);

	let base58AccountAddress = getAccountAddressFromPublicKey(keyPair.publicKey);

	let base58AccountPublicKey = Base58.encode(keyPair.publicKey);
	let base58AccountPrivateKey = Base58.encode(keyPair.privateKey);

	document.getElementById('base58AccountPublicKey').value = base58AccountPublicKey;
	document.getElementById('base58AccountPrivateKey').value = base58AccountPrivateKey;
	document.getElementById('base58AccountAddress').value = base58AccountAddress;
}

function doAccounts(){
	let base58BaseSeed = document.getElementById('base58BaseSeed').value;
	document.getElementById('output').innerHTML = '';

	if(base58BaseSeed == '') {
		return;
	}


	countAddrs = document.getElementById('countAddrs').value;
	if(isNaN(countAddrs) || countAddrs < 1) {
		alert("invalid count!");
		return;
	}
	seed = Base58.decode(base58BaseSeed);

	if(seed.length != 32) {
		alert("invalid seed!");
		return;
	}

	$('#output').text('');
	for (let nonce = 0; nonce < countAddrs; nonce ++) {
		let accountSeed = generateAccountSeed(seed, nonce, false);
		let keyPair = getKeyPairFromSeed(accountSeed);
		let base58addressSeed = Base58.encode(accountSeed);
		let row = $('<div>',{class:'clearfix panel panel-default'});
		let addrObj = $('<button>',{class:'btn btn-primary  btn-xs btn-block'}).text(getAccountAddressFromPublicKey(keyPair.publicKey));
		addrObj.click(function () {
			doAccountFromSeed(base58addressSeed);
		});
		let seedObj = $('<button>',{class:'btn btn-default  btn-xs btn-block'}).text(base58addressSeed);
		seedObj.click(function () {
			doAccountFromSeed(base58addressSeed);
		});
		row.append($('<h3>',{class:'col-xs-1'}).text(nonce))
		row.append($('<div>',{class:'col-xs-11'}).append(addrObj).append(seedObj))
		$('#output').append(row);
	}
}

function onLoad()
{
	if (/test/.test(window.location.hash))
	{
		$("#brainWalletPassphrase").val("12345678фыва");
		$("#doBrainButton").click();
		if($("#base58BaseSeed").val() == 'CjCmqGrNJoy499fMFGmonRipBc4GKk9RGRHF4BY7XSBN') {
			$("#base58BaseSeed").css({"color": "green"});
		} else {
			$("#base58BaseSeed").css({"color": "red"});
		}

		$("#base58AccountSeed").val("8stsVtM4gQsJbvVbDx1eszkd5zUWEtt6tmUwYBB4PmA3");
		$("#doAccountFromSeedButton").click();
		if($("#base58AccountAddress").val() == 'QMBKyCtSjjNETmNLQwfCxd6sADJNVXAShk') {
			$("#base58AccountAddress").css({"color": "green"});
		} else {
			$("#base58AccountAddress").css({"color": "red"});
		}
	}
}