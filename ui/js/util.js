/*
 * Copyright IBM Corp, 2015
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

ginger = {};

ginger.getFirmware = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/firmware',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.updateFirmware = function(content, suc, err){
    $.ajax({
        url : "plugins/ginger/firmware",
        type : 'PUT',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(content),
        success: suc,
        error: err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.listBackupArchives = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/backup/archives',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.createBackupArchive = function(bak, suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/backup/archives',
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(bak),
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.getBackupArchiveFile = function(id, suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/backup/archives/' + encodeURIComponent(id) + '/file',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.deleteBackupArchive = function(id, suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/backup/archives/' + encodeURIComponent(id),
        type : 'DELETE',
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.deleteBackupArchives = function(content, suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/backup/discard_archives',
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(content),
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.getInterfaces = function(suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/network/interfaces',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.updateInterface = function(name, content, suc, err){
    $.ajax({
        url : 'plugins/ginger/network/interfaces/' + encodeURIComponent(name),
        type : 'PUT',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(content),
        success: suc,
        error: err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.getNetworkGlobals = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/network',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.updateNetworkGlobals = function(content, suc, err){
    $.ajax({
        url : 'plugins/ginger/network',
        type : 'PUT',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(content),
        success: suc,
        error: err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.confirmNetworkUpdate = function(suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/network/confirm_change',
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.confirmInterfaceUpdate = function(name, suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/network/interfaces/' + encodeURIComponent(name) + '/confirm_change',
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.validateIp = function(ip){
    var ipReg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipReg.test(ip);
};

ginger.validateMask = function(mask){
    if(mask.indexOf('.')!=-1){
        var secs = mask.split('.');
        var binMask = "";
        for(var i=0; i<secs.length; i++)
            binMask += parseInt(secs[i]).toString(2);
        return /^1+0+$/.test(binMask);
    }else{
        return mask > 0 && mask < 32;
    }
};

ginger.getPowerProfiles = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/powerprofiles',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.activatePowerProfile = function(name, suc, err){
    $.ajax({
        url : "plugins/ginger/powerprofiles/" + encodeURIComponent(name),
        type : 'PUT',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify({ active: true }),
        success: suc,
        error: err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.getSANAdapters = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/san_adapters',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.getSensors = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/sensors',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.getSEPSubscriptions = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/ibm_sep',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.deleteSubscription = function (hostname, suc, err) {
    wok.requestJSON({
        url : wok.url + 'plugins/ginger/ibm_sep/subscribers/' + hostname,
        type : 'DELETE',
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
}

ginger.addSEPSubscription = function(subscription, suc, err){
    wok.requestJSON({
        url : wok.url + 'plugins/ginger/ibm_sep/subscribers',
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify(subscription),
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.getSEPStatus = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/ibm_sep',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.startSEP = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/ibm_sep/start',
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.stopSEP = function(suc, err){
    wok.requestJSON({
        url : 'plugins/ginger/ibm_sep/stop',
        type : 'POST',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : err || function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
};

ginger.getUsers = function(suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/users',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        resend : true,
        success : suc,
        error : function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
}

ginger.addUser = function(username, suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/users',
        type : 'POST',
        contentType : 'application/json',
        data : JSON.stringify(username),
        dataType : 'json',
        resend : true,
        success : suc,
        error : function(data) {
            wok.message.error(data.responseJSON.reason);
            err();
        }
    });
}

ginger.deleteUser = function (username, suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/users/' + username,
        type : 'DELETE',
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error : function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
}

ginger.getCapabilities = function(suc, err) {
    wok.requestJSON({
        url : 'plugins/ginger/capabilities',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error : function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
}
ginger.getFilesystems =  function(suc , err){
	wok.requestJSON({
        url : 'plugins/ginger/filesystems',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error : function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
}
ginger.getSwapdevices =  function(suc , err){
	wok.requestJSON({
        url : 'plugins/ginger/swaps',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error : function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
}

ginger.getVolumegroups =  function(suc , err){
	wok.requestJSON({
        url : 'plugins/ginger/vgs',
        type : 'GET',
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error : function(data) {
            wok.message.error(data.responseJSON.reason);
        }
    });
}
ginger.getHostDetails = function (suc,err) {
  wok.requestJSON({
      url : 'plugins/gingerbase/host',
      type : 'GET',
      resend: true,
      contentType : 'application/json',
      dataType : 'json',
      success : suc,
      error: err
  });
}

/**
 * Get the host static information.
 */
ginger.getPlugins = function(suc, err) {
    wok.requestJSON({
        url : 'plugins',
        type : 'GET',
        resend: true,
        contentType : 'application/json',
        dataType : 'json',
        success : suc,
        error: err
    });
}
ginger.createGrid =  function(opts){
	var containerId = opts['id'];
	var url = opts['url'];
	var gridId=opts['gridId'];
	var fields = JSON.parse(opts['gridFields']);
	var data = JSON.parse(opts['data']);
	var gridHtml = [
	                '<table id="',gridId,'" class="table table-condensed table-hover table-striped" >',
	                  '<thead>',
		                   '<tr>',
		                   '</tr>',
	                  '</thead>'
	               ].join('');
	$(gridHtml).appendTo('#'+containerId);
	var gridHeader = $('tr',gridHtml);

	for(var i=0;i<fields.length;i++){

		var columnHtml = [
                      '<th data-type="',fields[i]["type"],'" data-column-id="',fields[i]["column-id"],'"',
                       (fields[i].identifier)?'data-identifier="true"':'',' data-align="left" headerAlign="center"',
                       ("formatter" in fields[i])?'data-formatter='+fields[i]["formatter"]:'',
                       (fields[i].width)?(' data-width="'+fields[i].width+'"'):'',
                       'data-header-css-class="gridHeader">',
                      ("title" in fields[i])?fields[i]["title"]:fields[i]["column-id"],
                      '</th>'
		                  ].join('');
		$(columnHtml).appendTo($('tr','#'+gridId));

	}

	var grid = $('#'+gridId).bootgrid({
        selection: true,
        multiSelect: true,
        keepSelection: true,
        rowCount:-1,
        sorting:true,
        columnSelection:false,
        rowSelect:true,
        formatters:{
          "percentage-used" : function(column , row){
          return '<div class="progress"><div class="progress-bar-info" style="width:'+row[column['id']]+'">'+row[column['id']]+'</div></div>';
        },
          "nw-interface-status": function(column, row)
           {
             var value = row[column.id];
             if (column.id == "status") {
               if (value == "up")
                 return "<span class=\"nw-interface-status-enabled enabled\"> <i class=\"fa fa-power-off\"></i></span>";
             return "<span class=\"nw-interface-status-disabled disabled\"> <i class=\"fa fa-power-off\"></i></span>";
           }
         },
         "nw-address-space": function(column, row)
          {
            var ipaddr = row[column.id];
            var netmask = row['netmask'];
            if (!ipaddr) {
              return "";
            }
            return ipaddr + "/" + netmask;
        }
       },
        css:{
            iconDown : "fa fa-sort-desc",
            iconUp: "fa fa-sort-asc"
         },
         labels :{
           search : "Filter"
         }
    }).on("load.rs.jquery.bootgrid", function (e) {
        $('.input-group .glyphicon-search').removeClass('.glyphicon-search').addClass('fa fa-search');
     });

	grid.bootgrid("append",data);
}
ginger.getSelectedRowsData = function(opts){
  var selectedRowDetails = [];
  var currentRows = ginger.getCurrentRows(opts);
  var selectedRowIds = ginger.getSelectedtRows(opts);
  var identifier = opts['identifier'];
  $.each(currentRows,function(i,row){
    var rowDetails = row;
    if(selectedRowIds.indexOf(rowDetails[identifier])!=-1){
      selectedRowDetails.push(rowDetails);
    }
  });
  return selectedRowDetails;
};

ginger.getCurrentRows =  function(opts){
	return $('#'+opts['gridId']).bootgrid("getCurrentRows");
}

ginger.getSelectedtRows =  function(opts){
	return $('#'+opts['gridId']).bootgrid("getSelectedRows");
}

ginger.getTotalRowCount =  function(opts){
	return $('#'+opts['gridId']).bootgrid("getTotalRowCount");
}

ginger.reloadGridData =  function(opts){
	return $('#'+opts['gridId']).bootgrid("reload");
}
ginger.createActionList = function(settings){
  var toolbarNode = null;
  var btnHTML, dropHTML = [];
  var container = settings.panelID;
  var toolbarButtons = settings.buttons;
  var buttonType = settings.type;
  toolbarNode = $('<div class="btn-group"></div>');
  toolbarNode.appendTo($("#"+container));
  dropHTML = ['<div class="dropdown menu-flat">',
                      '<button id="action-dropdown-button-', container, '" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">',
                       (buttonType==='action')?'<span class="edit-alt"></span>Actions':'<i class="fa fa-plus-circle"></i>Add ','<span class="caret"></span>',
                      '</button>',
                      '<ul class="dropdown-menu"></ul>',
                      '</div>'
                  ].join('');
   $(dropHTML).appendTo(toolbarNode);

     $.each(toolbarButtons, function(i, button) {
                    var btnHTML = [
                        '<li role="presentation"', button.critical === true ? ' class="critical"' : '', '>',
                        '<a role="menuitem" tabindex="-1" data-dismiss="modal"', (button.id ? (' id="' + button.id + '"') : ''), (button.disabled === true ? ' class="disabled"' : ''),
                        '>',
                        button.class ? ('<i class="' + button.class) + '"></i>' : '',
                        button.label,
                        '</a></li>'
                    ].join('');
                    var btnNode = $(btnHTML).appendTo($('.dropdown-menu', toolbarNode));
                    button.onClick && btnNode.on('click', button.onClick);
                });
}
ginger.changeButtonStatus = function(buttonIds, state){
  $.each(buttonIds, function(i, buttonId) {
     $('#'+buttonId).prop("disabled", state);
  });
}
