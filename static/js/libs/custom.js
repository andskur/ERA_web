/**
 * Created by abrikos on 13.03.17.
 */
function getPeers() {
	$.get('/wallet/peers',function (json) {
		$.each(json.data, function (i, item) {
			let row = $('<tr>');
			row.append($('<td>').text(item));
			$('#peers').append(row)
		})
	}, 'json')
}

function getMyTransactions() {
	$.get('/wallet/transactions',function (json) {
		console.log(json.data[0].transactions)
		$.each(json.data[0].transactions, function (i, item) {
			let row = $('<tr>');
			row.append($('<td>').text(item.record_type));
			row.append($('<td>').text(item.creator));
			if(item.asset!==-1) {
				row.append($('<td>').text(item.asset.name));
				row.append($('<td>').text(item.asset.quantity));
				row.append($('<td>').text(''));
				row.append($('<td>').text(item.asset.description));
			}else{
				row.append($('<td>').text(item.asset.type));
				row.append($('<td>').text(item.amount));
				row.append($('<td>').text(item.recipient));
				row.append($('<td>').text(''));
			}
			$('#transactions').append(row);
		})
	}, 'json')
}

function getMyBlocks() {
	$.get('/wallet/blocks',function (json) {
		$.each(json.data, function (i, item) {
			let row = $('<tr>');
			row.append($('<td>').text(item.height));
			row.append($('<td>').text( new Date(item.timestamp*1000)));
			row.append($('<td>').text(item.creator));
			row.append($('<td>').text(item.generatingBalance + ' ' + item.winValueTargeted));
			row.append($('<td>').text(item.fee));
			$('#blocks').append(row);
		})
	}, 'json')
}