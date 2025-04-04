package CMS;

/**
 * Generated from IDL struct "EmailCampaign".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public final class EmailCampaignHolder
	implements org.omg.CORBA.portable.Streamable
{
	public CMS.EmailCampaign value;

	public EmailCampaignHolder ()
	{
	}
	public EmailCampaignHolder(final CMS.EmailCampaign initial)
	{
		value = initial;
	}
	public org.omg.CORBA.TypeCode _type ()
	{
		return CMS.EmailCampaignHelper.type ();
	}
	public void _read(final org.omg.CORBA.portable.InputStream _in)
	{
		value = CMS.EmailCampaignHelper.read(_in);
	}
	public void _write(final org.omg.CORBA.portable.OutputStream _out)
	{
		CMS.EmailCampaignHelper.write(_out, value);
	}
}
