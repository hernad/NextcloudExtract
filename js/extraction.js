import { registerFileAction, FileAction, Permission, DefaultType } from '@nextcloud/files'

//window.addEventListener('DOMContentLoaded', () => {

	//if (!OCA.Files || !OCA.Files.fileActions) {
	//	return;
	//}

	const types = {
		zip: ['application/zip',],
		rar: ['application/x-rar-compressed'],
		// TAR
		//'application/x-tar', 'application/x-7z-compressed'
		other: ['application/x-tar', 'application/x-7z-compressed', 'application/x-bzip2', 'application/x-deb', 'application/x-gzip', 'application/x-compressed'],
	};

	for (const [type, mimeTypes] of Object.entries(types)) {
		for (const mime of mimeTypes) {
			// https://github.com/nextcloud/contacts/pull/3669/files#diff-be562762a0871f0400d0cc1a47646ca7636bdd672b8cbe2658db30551800d4a2
			//OCA.Files.fileActions.registerAction({
			
			
			// https://github.com/nextcloud/contacts/blob/main/src/files-action.js
			// https://github.com/Raudius/files_scripts/blob/master/src/files.ts

			registerFileAction(new FileAction({
				name: 'extract',
				displayName: t('extract', 'Extract here'),
				mime,
				permissions: OC.PERMISSION_UPDATE,
				//type: OCA.Files.FileActions.TYPE_DROPDOWN,
				// iconClass: 'icon-extract',
				async exec(filename, view, dir) {
					var data = {
						nameOfFile: filename,
						directory: dir,
						//external: context.fileInfoModel.attributes.mountType && context.fileInfoModel.attributes.mountType.startsWith("external") ? 1 : 0,
						type: type,
					};
					//const tr = context.fileList.findFileEl(filename);
					//context.fileList.showFileBusyState(tr, true);
					$.ajax({
						type: "POST",
						async: "false",
						url: OC.filePath('extract', 'ajax', 'extract.php'),
						data: data,
						success: function (response) {
							if (response.code === 1) {
								context.fileList.reload();
							} else {
								//context.fileList.showFileBusyState(tr, false);
								OC.dialogs.alert(
									t('extract', response.desc),
									t('extract', 'Error extracting ' + filename)
								);
							}
						}
					});
				}
			}));
		}
	}

//});
