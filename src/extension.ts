import * as vscode from 'vscode';
import { WSAECONNABORTED } from 'constants';

import GoToDefinitionConfiguration from './commands/goToDefinitionConfiguration';
import GoToDefinitionTypeScript from './commands/goToDefinitionTypeScript';
import CompileScript from './commands/compileScript';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('sfk.studio.goToDefinitionConfiguration', GoToDefinitionConfiguration.execute),
		vscode.languages.registerDefinitionProvider('typescript', { provideDefinition: GoToDefinitionTypeScript.execute }),
		vscode.languages.registerImplementationProvider('typescript', { provideImplementation: GoToDefinitionTypeScript.execute }),
		vscode.workspace.onDidSaveTextDocument(CompileScript.executeCompile),
		vscode.workspace.onDidSaveTextDocument(CompileScript.executeLibrariesDeclaration),
		vscode.workspace.onDidRenameFiles(CompileScript.executeRename)
	);

	CompileScript.executeCompileAll();
}

export function deactivate() {}
