
import { BlobServiceClient } from '@azure/storage-blob'

const CONTAINER_NAME = 'codeverse';

const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;AccountName=rahimcdn;AccountKey=IiRkHU0l2zzFMGUZ5Z+Y1A4z7WadEKniE+kAfIu34TlYfSz2TkX8vQbcAZ648aycj8WrEOsQdEkT+ASt9Q78bA==;EndpointSuffix=core.windows.net`
);

module.exports = { blobServiceClient, CONTAINER_NAME };
