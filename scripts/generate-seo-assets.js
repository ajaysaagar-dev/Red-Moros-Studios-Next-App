const { ImageResponse } = require('next/og');
const React = require('react');
const fs = require('fs');
const path = require('path');

async function generateAssets() {
  const publicDir = path.join(__dirname, '..', 'public');

  console.log('Generating OpenGraph banner (1200x630)...');
  const ogElement = React.createElement(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 80px',
        backgroundColor: '#09090C',
        color: '#F7F2F3',
        fontFamily: 'sans-serif',
        border: '3px solid #FF0000',
        position: 'relative',
      },
    },
    // Top bar
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 0, 0, 0.4)',
          paddingBottom: '20px',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          },
        },
        React.createElement('div', {
          style: {
            width: '16px',
            height: '16px',
            backgroundColor: '#FF0000',
            borderRadius: '50%',
          },
        }),
        React.createElement(
          'span',
          {
            style: {
              color: '#FF0000',
              fontSize: '18px',
              fontWeight: 800,
              letterSpacing: '4px',
              textTransform: 'uppercase',
            },
          },
          'RED MOROS STUDIOS // OFFICIAL'
        )
      ),
      React.createElement(
        'div',
        {
          style: {
            color: '#B8AEB1',
            fontSize: '16px',
            letterSpacing: '2px',
          },
        },
        'REDMOROS.AJAYSAAGAR.ONLINE'
      )
    ),

    // Middle Hero Section
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          margin: 'auto 0',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'baseline',
            gap: '24px',
          },
        },
        React.createElement(
          'span',
          {
            style: {
              fontSize: '96px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-2px',
              lineHeight: '1',
            },
          },
          'RED'
        ),
        React.createElement(
          'span',
          {
            style: {
              fontSize: '108px',
              fontWeight: 900,
              color: '#FF0000',
              letterSpacing: '-2px',
              lineHeight: '1',
            },
          },
          'MOROS'
        )
      ),
      React.createElement(
        'div',
        {
          style: {
            fontSize: '32px',
            fontWeight: 800,
            color: '#F96769',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginTop: '10px',
          },
        },
        'STUDIOS'
      ),
      React.createElement(
        'div',
        {
          style: {
            fontSize: '24px',
            color: '#E0D8D9',
            maxWidth: '900px',
            lineHeight: '1.4',
            marginTop: '16px',
          },
        },
        'Story-Driven Psychological Horror Thriller Game Experience'
      )
    ),

    // Bottom keywords and aliases strip
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 0, 0, 0.3)',
          paddingTop: '20px',
          color: '#B8AEB1',
          fontSize: '16px',
          letterSpacing: '2px',
        },
      },
      React.createElement(
        'span',
        null,
        'RED MOROS • REDMOROS • RED MOROS STUDIOS • REDMOROSSTUDIOS'
      ),
      React.createElement(
        'span',
        { style: { color: '#FFF700', fontWeight: 700 } },
        'UNKNOWN 13 // COMING SOON'
      )
    )
  );

  const ogResponse = new ImageResponse(ogElement, { width: 1200, height: 630 });
  const ogBuffer = Buffer.from(await ogResponse.arrayBuffer());
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogBuffer);
  fs.writeFileSync(path.join(publicDir, 'twitter-image.png'), ogBuffer);
  console.log('Saved og-image.png and twitter-image.png');

  // Generate Square Icons (192 and 512)
  console.log('Generating Icon 512x512...');
  const iconElement512 = React.createElement(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#09090C',
        color: '#FFFFFF',
        fontFamily: 'sans-serif',
        position: 'relative',
        border: '12px solid #FF0000',
      },
    },
    React.createElement(
      'div',
      {
        style: {
          fontSize: '140px',
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: '0.9',
          letterSpacing: '-4px',
        },
      },
      'RED'
    ),
    React.createElement(
      'div',
      {
        style: {
          fontSize: '120px',
          fontWeight: 900,
          color: '#FF0000',
          lineHeight: '0.9',
          letterSpacing: '-4px',
        },
      },
      'MOROS'
    ),
    React.createElement(
      'div',
      {
        style: {
          fontSize: '32px',
          fontWeight: 800,
          color: '#FFF700',
          letterSpacing: '10px',
          marginTop: '20px',
        },
      },
      'STUDIOS'
    )
  );

  const iconResponse512 = new ImageResponse(iconElement512, { width: 512, height: 512 });
  const iconBuffer512 = Buffer.from(await iconResponse512.arrayBuffer());
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), iconBuffer512);

  const iconResponse192 = new ImageResponse(iconElement512, { width: 192, height: 192 });
  const iconBuffer192 = Buffer.from(await iconResponse192.arrayBuffer());
  fs.writeFileSync(path.join(publicDir, 'icon.png'), iconBuffer192);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), iconBuffer192);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), iconBuffer192);
  console.log('Saved icons: icon.png, icon-192.png, icon-512.png, apple-icon.png');
}

generateAssets().catch((err) => {
  console.error(err);
  process.exit(1);
});
