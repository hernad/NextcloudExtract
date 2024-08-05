import { DefaultType, registerFileAction, FileAction } from '@nextcloud/files'
import { translate as t } from '@nextcloud/l10n'
import Vue from 'vue'
import ContactSvg from '@mdi/svg/svg/account-multiple.svg?raw'

Vue.prototype.t = t

console.log('==extract-main start v36 ===');


//const types = {
//		zip: ['application/zip',],
//		rar: ['application/x-rar-compressed'],
//		// TAR
//		//'application/x-tar', 'application/x-7z-compressed'
//		other: ['application/x-tar', 'application/x-7z-compressed', 'application/x-bzip2', 'application/x-deb', 'application/x-gzip', 'application/x-compressed'],
//};

//for (const [type, mimeTypes] of Object.entries(types)) {
//		for (const mime of mimeTypes) {
			// https://github.com/nextcloud/contacts/pull/3669/files#diff-be562762a0871f0400d0cc1a47646ca7636bdd672b8cbe2658db30551800d4a2
		
			// https://github.com/Raudius/files_scripts/blob/master/src/files.ts

			// https://github.com/nextcloud/contacts/blob/main/src/files-action.js

			registerFileAction(new FileAction({
				id: 'extract',
				displayName: () => t('extract', 'Raspakuj'),
				default: 0, //DefaultType.DEFAULT,
				iconSvgInline: () => ContactSvg,
				enabled: (nodes) => {
					if (nodes.length !== 1) {
						return false
					}
					const node = nodes[0]
					return node.mime === "application/zip" //&& (node.permissions & Permission.READ)
				},
				// permissions: OC.PERMISSION_UPDATE,
				//type: OCA.Files.FileActions.TYPE_DROPDOWN,
				// iconClass: 'icon-extract',
				async exec(file) {
					console.log('extract exec', file.basename, file.dirname, file.mime, file.source);

					var data = {
						nameOfFile: file.basename,
						directory: file.dirname,
						type: 'zip', 
					//	//external: context.fileInfoModel.attributes.mountType && context.fileInfoModel.attributes.mountType.startsWith("external") ? 1 : 0,
					    external: 0
					};
					////const tr = context.fileList.findFileEl(filename);
					////context.fileList.showFileBusyState(tr, true);
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
//		}
//};

console.log('==extract-main end zip===');

