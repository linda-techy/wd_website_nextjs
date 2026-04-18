/**
 * Tests for constants and helper functions in lib/constants.
 */

import {
  STATE_LIST,
  DISTRICT_LIST,
  PROJECT_TYPES,
  DEFAULT_STATE,
  DEFAULT_DISTRICT,
  getDistrictsByState,
  getDistrictDisplayName,
  getStateDisplayName,
} from '@/lib/constants';

describe('Constants', () => {
  test('STATE_LIST contains Kerala as first entry', () => {
    expect(STATE_LIST[0].value).toBe('Kerala');
    expect(STATE_LIST[0].displayText).toBe('Kerala');
  });

  test('DEFAULT_STATE is Kerala', () => {
    expect(DEFAULT_STATE).toBe('Kerala');
  });

  test('DEFAULT_DISTRICT is Thrissur', () => {
    expect(DEFAULT_DISTRICT).toBe('Thrissur');
  });

  test('PROJECT_TYPES includes residential_construction', () => {
    const values = PROJECT_TYPES.map((t) => t.value);
    expect(values).toContain('residential_construction');
  });

  test('DISTRICT_LIST has at least 14 Kerala districts', () => {
    const keralaDistricts = DISTRICT_LIST.filter((d) => d.state === 'Kerala');
    expect(keralaDistricts.length).toBeGreaterThanOrEqual(14);
  });
});

describe('getDistrictsByState', () => {
  test('returns districts for a valid state', () => {
    const districts = getDistrictsByState('Kerala');
    expect(districts.length).toBeGreaterThan(0);
    districts.forEach((d) => expect(d.state).toBe('Kerala'));
  });

  test('returns empty array for empty string', () => {
    expect(getDistrictsByState('')).toEqual([]);
  });

  test('returns empty array for unknown state', () => {
    expect(getDistrictsByState('UnknownState')).toEqual([]);
  });
});

describe('getDistrictDisplayName', () => {
  test('returns display name for a known district value', () => {
    expect(getDistrictDisplayName('Thrissur')).toBe('Thrissur');
  });

  test('returns the raw value for an unknown district', () => {
    expect(getDistrictDisplayName('xyz-unknown')).toBe('xyz-unknown');
  });
});

describe('getStateDisplayName', () => {
  test('returns display name for a known state value', () => {
    expect(getStateDisplayName('Kerala')).toBe('Kerala');
  });

  test('returns the raw value for an unknown state', () => {
    expect(getStateDisplayName('unknown-state')).toBe('unknown-state');
  });
});
