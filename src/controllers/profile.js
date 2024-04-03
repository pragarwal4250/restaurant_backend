const Profile = require('../models/profile');

exports.getProfiles = async (req, res) => {
  await Profile.find()
    .then(profiles => {
      res.json(profiles); // Response should send the profiles retrieved from the database
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};

exports.postProfiles = async (req, res) => {
  try {
    const profiles = req.body; // Assuming req.body contains an array of profiles

    const savedProfiles = await Promise.all(profiles.map(async profileData => {
      const { name, email, phone, addresses } = profileData;

      // Parse phone data
      const { countryCode, number } = phone;

      // Create an array to hold parsed addresses
      const parsedAddresses = [];

      // Loop through addresses and parse them
      addresses.forEach(addressData => {
        const { name, apt, line1, line2, city, state, country, zip, notes } = addressData;
        const newAddress = new Address({ name, apt, line1, line2, city, state, country, zip, notes });
        parsedAddresses.push(newAddress);
      });

      // Create a new profile with parsed data
      const newProfile = new Profile({ name, email, phone: { countryCode, number }, addresses: parsedAddresses });
      
      // Save the profile
      return await newProfile.save();
    }));

    res.json(savedProfiles); // Response sends the profiles saved to the database
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
