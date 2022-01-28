const moduleExports = {
	async rewrites() {
		return [
			{
				// Rewrite `api.reacher.email/v0/check_email` to
				// `reacher.email/api/v0/check_email` to be handled by the
				// Next.js API handlers.
				source: '/v0/check_email',
				destination: '/api/v0/check_email',
			},
		];
	},
};
