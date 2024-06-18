const shippimngAddressServices = require("../../services/user/shipping_address.service");
const shippimngAddressService = new shippimngAddressServices();

exports.createAddress = async (req, res) => {
  const userId = req.userId;
  const { address_1, address_2, city, pincode } = req.body;
  try {
    const address = await shippimngAddressService.createAddress(
      userId,
      address_1,
      address_2,
      city,
      pincode
    );
    res.json(address);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllAddress = async (req, res) => {
  try {
    const addresses = await shippimngAddressService.getAllAddress();
    res.json(addresses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateAddress = async (req, res) => {
  const userId = req.userId;
  const { addressId, address_1, address_2, city, pincode } = req.body;
  try {
    const address = await shippimngAddressService.updateAddress(
      userId,
      addressId,
      address_1,
      address_2,
      city,
      pincode
    );
    res.json(address);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteAddress = async (req, res) => {
    id = req.params.id;
  try {
    await shippimngAddressService.deleteAddress(id);
    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
