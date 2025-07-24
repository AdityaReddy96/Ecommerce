import { Feature } from "../../models/Feature.js";

export const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featureImage = new Feature({
      image,
    });

    await featureImage.save();

    res.status(201).json({
      success: true,
      message: "Feature Image Added Successfully",
      data: featureImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured in addFeatureImage",
    });
  }
};

export const getFeatureImage = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      message: "Feature Image Fetched Successfully",
      data: images,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured in getFeatureImage",
    });
  }
};
