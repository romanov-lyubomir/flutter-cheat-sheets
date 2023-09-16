const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('flutter-cheat-sheets.searchFlutterCheatSheet', function () {
		vscode.window.showInformationMessage('Hello World from Flutter Cheat Sheets!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
