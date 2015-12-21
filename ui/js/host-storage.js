/**
 *
 */
ginger.initStorage = function() {
  $(".content-area", "#storage-section").css("height", "100%");
  ginger.getHostDetails(function(result) {
    ginger.hostarch = result["architecture"]
    ginger.loadSanAdapters();
    ginger.getPlugins(function(result) {
      if ((ginger.hostarch == "s390x") && ($.inArray("gingers390x", result) != -1)) {
        ginger.loadFcpTapeDevices();
      }
    });
  });
  ginger.loadFileSystemDetails();
  ginger.loadSwapDeviceDetails();
  ginger.loadVolumeGroupDetails();
  ginger.loadStorageDeviceDetails();
};

ginger.loadStorageActionButtons = function() {
  var addButton = [{
    id: 'sd-add-FCP-button',
    class: 'fa fa-plus-circle',
    label: 'Add FCP Device',
    onClick: function(event) {
      wok.window.open('plugins/gingers390x/addFCPLuns.html');
    }
  }, {
    id: 'sd-add-ECKD-button',
    class: 'fa fa-plus-circle',
    label: 'Add ECKD Device',
    onClick: function(event) {
      // wok.window.open('plugins/gingerbase/report-add.html');
    }
  }, {
    id: 'sd-add-iSCSI-button',
    class: 'fa fa-plus-circle',
    label: 'Add iSCSI',
    onClick: function(event) {
      //wok.window.open('plugins/gingerbase/report-add.html');
    }
  }];

  var actionButton = [{
    id: 'sd-add-VG-button',
    class: 'fa fa-plus-circle',
    label: 'Add to VG',
    onClick: function(event) {
      //wok.window.open('plugins/gingers390x/addFCPLuns.html');
    }
  }, {
    id: 'sd-format-button',
    class: 'fa fa-pencil-square-o',
    label: 'Format',
    onClick: function(event) {
      var opts = [];
      opts['gridId'] = "stgDevGrid";
      opts['identifier'] = "id";
      var selectedRows = ginger.getSelectedRowsData(opts);
      ginger.selectedrows = selectedRows;
      wok.window.open('plugins/ginger/host-storage-format.html');

    }
  }, {
    id: 'sd-partition-button',
    class: 'fa fa-pie-chart',
    label: 'Partition',
    onClick: function(event) {
      //wok.window.open('plugins/gingerbase/report-add.html');
    }
  }, {
    id: 'sd-remove-button',
    class: 'fa fa-minus-circle',
    label: 'Remove',
    critical: true,
    onClick: function(event) {
      //wok.window.open('plugins/gingerbase/report-add.html');
    }
  }];

  var addListSettings = {
    panelID: 'file-systems-add',
    buttons: addButton,
    type: 'add'
  };
  var actionListSettings = {
    panelID: 'file-systems-actions',
    buttons: actionButton,
    type: 'action'
  };

  ginger.createActionList(addListSettings);
  ginger.createActionList(actionListSettings);
};
ginger.loadFileSystemDetails = function() {
  //ginger.loadStorageActionButtons();
  var gridFields = [];
  var opts = [];

  opts['id'] = 'file-systems';
  opts['gridId'] = "fileSystemsGrid";

  gridFields = [{
    "column-id": 'filesystem',
    "type": 'string',
    "width": "20%",
    "title": i18n['GINTITLE0001M']
  }, {
    "column-id": 'mounted_on',
    "type": 'string',
    "identifier": true,
    "width": "20%",
    "title": i18n['GINTITLE0003M']
  }, {
    "column-id": 'type',
    "type": 'string',
    "width": "10%",
    "title": i18n['GINTITLE0002M']
  }, {
    "column-id": 'size',
    "type": 'string',
    "width": "10%",
    "title": i18n['GINTITLE0004M']
  }, {
    "column-id": "use%",
    "type": 'string',
    "title": i18n['GINTITLE0005M'],
    "width": "35%",
    "formatter": "percentage-used"
  }];
  opts['gridFields'] = JSON.stringify(gridFields);

  ginger.createBootgrid(opts);

  ginger.getFilesystems(function(result) {
    ginger.loadBootgridData("fileSystemsGrid", result);
  });
};
ginger.loadSwapDeviceDetails = function() {
  var gridFields = [];
  var opts = [];
  opts['id'] = 'swap-devices';
  opts['gridId'] = "swapDevicesGrid";

  gridFields = [{
    "column-id": 'filename',
    "type": 'string',
    "width": "20%",
    "title": i18n['GINTITLE0001M'],
    "identifier": true
  }, {
    "title": i18n['GINTITLE0002M'],
    "column-id": 'type',
    "width": "15%",
    "type": 'string'
  }, {
    "title": i18n['GINTITLE0006M'],
    "column-id": "size",
    "width": "10%",
    "type": 'string'
  }, {
    "title": i18n['GINTITLE0005M'],
    "column-id": "use_percent",
    "type": 'string',
    "width": "50%",
    "formatter": "percentage-used"
  }];
  opts['gridFields'] = JSON.stringify(gridFields);
  ginger.createBootgrid(opts);

  ginger.getSwapdevices(function(result) {
    for (i = 0; i < result.length; i++) {
      //calculate usage % from size and used (both are in bytes)
      result[i]['use_percent'] = (parseInt(result[i]['used']) / parseInt(result[i]['size'])) * 100;
      result[i]['use_percent'] = result[i]['use_percent'].toFixed(2) + "%";
      // convert size in bytes to readable format
      result[i]['size'] = wok.formatMeasurement(parseInt(result[i]['size']), {
        fixed: 2
      });
      result[i]['size'] = result[i]['size'].toString();
    }
    ginger.loadBootgridData("swapDevicesGrid", result);
  });
};

ginger.loadVolumeGroupDetails = function() {
  var gridFields = [];
  var opts = [];
  opts['id'] = 'volume-groups';
  opts['gridId'] = "volumeGroupsGrid";

  gridFields = [{
    "column-id": 'vgName',
    "type": 'string',
    "identifier": true,
    "width": "25%",
    "title": i18n['GINTITLE0001M']
  }, {
    "column-id": 'vgSize',
    "type": 'string',
    "width": "70%",
    "title": i18n['GINTITLE0006M']
  }];
  opts['gridFields'] = JSON.stringify(gridFields);

  ginger.createBootgrid(opts);

  ginger.getVolumegroups(function(result) {
    ginger.loadBootgridData("volumeGroupsGrid", result);
  });
};

ginger.loadStorageDeviceDetails = function() {
  var gridFields = [];
  var opts = [];
  opts['id'] = 'stg-devs';
  opts['gridId'] = "stgDevGrid";

  ginger.loadStorageActionButtons();
  gridFields = [{
    "column-id": 'id',
    "type": 'string',
    "identifier": true,
    "width": "50%",
    "title": i18n['GINTITLE0018M']
  }, {
    "column-id": 'mpath_count',
    "type": 'number',
    "width": "20%",
    "title": i18n['GINTITLE0019M']
  }, {
    "column-id": 'type',
    "type": 'string',
    "width": "15%",
    "title": i18n['GINTITLE0002M']
  }, {
    "column-id": 'size',
    "type": 'string',
    "width": "10%",
    "title": i18n['GINTITLE0004M']
  }];
  opts['gridFields'] = JSON.stringify(gridFields);

  ginger.createBootgrid(opts);

  ginger.getStgdevs(function(result) {
    ginger.loadBootgridData("stgDevGrid", result);
  });
}

ginger.loadSanAdapters = function() {
  var gridFields = [];
  var opts = [];
  opts['id'] = 'san-adapter-list';
  opts['gridId'] = "SanAdaptersGrid";
  if (ginger.hostarch == 's390x') {
    gridFields = [{
      "column-id": 'name',
      "type": 'string',
      "identifier": true,
      "width": "7%",
      "title": i18n['GINTITLE0001M']
    }, {
      "column-id": 'wwpn',
      "type": 'string',
      "width": "15%",
      "title": i18n['GINTITLE0007M']
    }, {
      "column-id": 'wwnn',
      "type": 'string',
      "width": "15%",
      "title": i18n['GINTITLE0008M']
    }, {
      "column-id": 'state',
      "type": 'string',
      "width": "7%",
      "title": i18n['GINTITLE0009M']
    }, {
      "column-id": 'speed',
      "type": 'string',
      "width": "6%",
      "title": i18n['GINTITLE0011M']
    }, {
      "column-id": 'symbolic_name',
      "type": 'string',
      "width": "45%",
      "title": i18n['GINTITLE0012M']
    }];
  } else {
    gridFields = [{
      "column-id": 'name',
      "type": 'string',
      "identifier": true,
      "width": "6%",
      "title": i18n['GINTITLE0001M']
    }, {
      "column-id": 'wwpn',
      "type": 'string',
      "width": "14%",
      "title": i18n['GINTITLE0007M']
    }, {
      "column-id": 'wwnn',
      "type": 'string',
      "width": "14%",
      "title": i18n['GINTITLE0008M']
    }, {
      "column-id": 'state',
      "type": 'string',
      "width": "6%",
      "title": i18n['GINTITLE0009M']
    }, {
      "column-id": 'ports_info',
      "type": 'string',
      "width": "14%",
      "title": i18n['GINTITLE0010M']
    }, {
      "column-id": 'speed',
      "type": 'string',
      "width": "6%",
      "title": i18n['GINTITLE0011M']
    }, {
      "column-id": 'symbolic_name',
      "type": 'string',
      "width": "35%",
      "title": i18n['GINTITLE0012M']
    }];
  }
  opts['gridFields'] = JSON.stringify(gridFields);
  opts['gridFields'] = JSON.stringify(gridFields);
  ginger.createBootgrid(opts);
  ginger.getSANAdapters(function(result) {
    for (i = 0; i < result.length; i++) {
      //format ports information
      result[i]['ports_info'] = result[i]['vports_inuse'] + '/' + result[i]['max_vports'];
    }
    ginger.loadBootgridData("SanAdaptersGrid", result);
  });
  ginger.getPlugins(function(result){
    if ((ginger.hostarch == "s390x") && ($.inArray("gingers390x", result) != -1)) {
      var actionButtonHtml = '<div class="btn-group">' +
        '<button class="btn btn-primary fa fa-plus-circle" type="submit" id="add-san-button" aria-expanded="false" disabled="true">' + i18n['GINTITLE0020M'] + '</button>' +
        '</div>';
      $(actionButtonHtml).appendTo('#san-adapter-add');
      }
  });
};

ginger.loadFcpTapeDevices = function() {
  $("#fcp-tape-devices-panel").removeClass("hidden")
  var gridFields = [];
  var opts = [];
  opts['id'] = 'fcp-tape-devices';
  opts['gridId'] = "fcptapeDevicesGrid";
  gridFields = [{
    "column-id": 'Generic',
    "type": 'string',
    "width": "10%",
    "title": i18n['GINTITLE0013M'],
    "identifier": true
  }, {
    "title": i18n['GINTITLE0014M'],
    "column-id": 'Device',
    "width": "10%",
    "type": 'string'
  }, {
    "title": i18n['GINTITLE0015M'],
    "column-id": "Target",
    "width": "10%",
    "type": 'string'
  }, {
    "title": i18n['GINTITLE0016M'],
    "column-id": "Model",
    "type": 'string',
    "width": "10%",
  }, {
    "title": i18n['GINTITLE0002M'],
    "column-id": 'Type',
    "width": "10%",
    "type": 'string'
  }, {
    "title": i18n['GINTITLE0009M'],
    "column-id": "State",
    "width": "10%",
    "type": 'string'
  }, {
    "title": i18n['GINTITLE0017M'],
    "column-id": "uuid",
    "type": 'string',
    "width": "35%",
  }];
  opts['gridFields'] = JSON.stringify(gridFields);
  ginger.createBootgrid(opts);

  ginger.getFcpTapeDevices(function(result) {
    ginger.loadBootgridData("fcptapeDevicesGrid", result);
  });
};

ginger.formatStorageDevice = function() {
  $('#storage-format').on("click", function() {
    var fileSysTypeSelected = $('input[name=fsSelection]:checked').val();
    alert("fileSysTypeSelected " + fileSysTypeSelected);
    var mydata = JSON.stringify(ginger.selectedrows);
    alert(mydata);
  });
}
