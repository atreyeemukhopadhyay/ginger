#
# Project Ginger
#
# Copyright IBM, Corp. 2014
#
# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public
# License as published by the Free Software Foundation; either
# version 2.1 of the License, or (at your option) any later version.
#
# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public
# License along with this library; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301 USA

import json
import os

from controls import Backup, Capabilities, DASDdevs, DASDPartitions, Firmware
from controls import FileSystems, LogicalVolumes, Network, Partitions
from controls import PhysicalVolumes, PowerProfiles, SanAdapters, Sensors, Sep
from controls import StorageDevs, Swaps, Users, VolumeGroups
from i18n import messages

from wok import config
from wok.config import PluginPaths
from wok.control.tasks import Tasks
from wok.root import WokRoot
from models import GingerModel


class Ginger(WokRoot):
    def __init__(self, wok_options=None):
        objstore_dir = os.path.dirname(os.path.abspath(config.get_object_store()))
        if not os.path.isdir(objstore_dir):
            os.makedirs(objstore_dir)

        self.model = GingerModel()
        super(Ginger, self).__init__(self.model)
        self.backup = Backup(self.model)
        self.capabilities = Capabilities(self.model)
        self.dasddevs = DASDdevs(self.model)
        self.dasdpartitions = DASDPartitions(self.model)
        self.filesystems = FileSystems(self.model)
        self.firmware = Firmware(self.model)
        self.lvs = LogicalVolumes(self.model)
        self.partitions = Partitions(self.model)
        self.powerprofiles = PowerProfiles(self.model)
        self.pvs = PhysicalVolumes(self.model)
        self.sensors = Sensors(self.model)
        self.stgdevs = StorageDevs(self.model)
        self.users = Users(self.model)
        self.swaps = Swaps(self.model)
        self.network = Network(self.model)
        self.api_schema = json.load(open(os.path.join(os.path.dirname(
                                    os.path.abspath(__file__)), 'API.json')))
        self.paths = PluginPaths('ginger')
        self.domain = "ginger"
        self.messages = messages
        self.san_adapters = SanAdapters(self.model)
        self.ibm_sep = Sep(self.model)
        self.vgs = VolumeGroups(self.model)
        self.tasks = Tasks(self.model)
