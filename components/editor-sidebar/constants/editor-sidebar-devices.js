export const EDITOR_SIDEBAR_DEVICE_TYPE_COMPUTER = 'computer';
export const EDITOR_SIDEBAR_DEVICE_TYPE_SMARTPHONE = 'smartphone';

export const SMARTPHONE_DEVICES = [
  { name: 'Default (9:16)', width: 0, height: 0 },
  { name: 'Samsung S5 / S7 / S7 Edge', width: 360, height: 640 },
  { name: 'Samsung S10', width: 360, height: 760 },
  { name: 'Samsung S20 FE', width: 412, height: 914 },
  { name: 'Xiaomi Mi 10T / 10T Pro', width: 393, height: 851 },
  { name: 'Huawei P30', width: 360, height: 780 },
  { name: 'iPhone 8 / SE', width: 375, height: 667 },
  { name: 'iPhone X / 11 Pro', width: 375, height: 812 },
  { name: 'iPhone XS Max / 11 Pro Max', width: 414, height: 896 },
  { name: 'iPhone 12 / 12 Pro', width: 390, height: 844 },
  { name: 'iPhone 12 Pro Max', width: 428, height: 926 },
];

export const SMARTPHONE_DEVICES_OPTIONS = SMARTPHONE_DEVICES.map((device) => ({
  name: device.name,
  value: {
    name: device.name,
    width: device.width,
    height: device.height,
  },
}));
