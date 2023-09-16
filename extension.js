const fs = require('fs');
const vscode = require('vscode');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('flutter-cheat-sheets.openCheatSheet', async () => {
        const availableCheatSheets = getCheatSheets();
        if (availableCheatSheets.length === 0) {
            vscode.window.showInformationMessage('No cheat sheets found.');
            return;
        }

        const selectedCheatSheet = await vscode.window.showQuickPick(availableCheatSheets, {
            placeHolder: 'Select a cheat sheet to open'
        });

        if (selectedCheatSheet) {
            const pdfFilePath = path.join(__dirname, 'cheat_sheets', `${selectedCheatSheet}.pdf`);
            vscode.commands.executeCommand('vscode.open', vscode.Uri.file(pdfFilePath));
        }
    });

    context.subscriptions.push(disposable);
}

function getCheatSheets() {
    console.log(__dirname);
    const cheatSheetDir = path.join(__dirname, 'cheat_sheets');
    try {
        const files = fs.readdirSync(cheatSheetDir);
        return files
            .filter(file => file.endsWith('.pdf'))
            .map(file => path.basename(file, '.pdf'));
    } catch (error) {
        console.error('Error reading cheat sheets:', error);
        return [];
    }
}

exports.activate = activate;
